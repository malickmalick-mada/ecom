import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-start"
      data-testid="login-page"
    >
      <div className="space-y-4 mb-12">
        <p className="text-label">Login</p>
        <h1 className="text-display-2">Welcome back.</h1>
        <p className="text-base-regular text-brand-muted">
          Sign in to access your orders and account settings.
        </p>
      </div>
      
      <form className="w-full space-y-6" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
            className="border-brand-border focus:border-brand"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
            className="border-brand-border focus:border-brand"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <button className="contrast-btn w-full mt-6" data-testid="sign-in-button">
          Sign in
        </button>
      </form>
      
      <div className="mt-12 pt-8 border-t border-brand-border w-full flex items-center justify-between">
        <span className="text-small-regular text-brand-muted">
          Don't have an account?
        </span>
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-label link-underline pb-1"
          data-testid="register-button"
        >
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Login
