import React from 'react'
import { graphql, compose } from 'react-apollo'
import LOGIN_MUTATION from '../../queries/LoginMutation'
import redirect from '../../lib/Redirect'
import cookie from 'cookie'
import FormButton from '../styles/FormButton'
import Input from '../general/Input'
import ClearFix from '../styles/ClearFix'
import FormTitle from '../styles/FormTitle'
import CenterBox from '../styles/CenterBox'
import FadeRightDiv from '../styles/FadeRightDiv'
import FormSection from '../styles/FormSection'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    if (this.props.user) {
      redirect({}, '/contracts')
    }
  }

  saveToState = e => {
    let { name, value, type } = e.target
    this.setState({ [name]: value })
  }

  handleClick = e => {
    e.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  render () {
    return (
      <FadeRightDiv>
        <CenterBox>

          <FormTitle title='Login' />
          <form className='pt2'>
            <FormSection>
              <Input
                value={this.state.email}
                name='email'
                onChange={this.saveToState}
                label='Email'
              />
            </FormSection>
            <FormSection>
              <Input
                value={this.state.password}
                name='password'
                onChange={this.saveToState}
                label='Password'
                type='password'
              />
            </FormSection>
            <FormButton onClick={this.handleClick} text='SUBMIT' />
            <ClearFix />
          </form>
          <div />

        </CenterBox>
      </FadeRightDiv>
    )
  }
}

const loginMutation = graphql(LOGIN_MUTATION, {
  props ({ ownProps, mutate }) {
    return {
      login (email, password) {
        return mutate({
          variables: { email, password },
          update: (store, response) => {
            document.cookie = cookie.serialize('token', response.data.login, {
              maxAge: 30 * 24 * 60 * 60 // 30 days
            })
            ownProps.client.resetStore().then(() => {
              redirect({}, '/contracts')
            })
          }
        })
      }
    }
  }
})

const LoginFormWithQueries = compose(loginMutation)(LoginForm)

export default LoginFormWithQueries
