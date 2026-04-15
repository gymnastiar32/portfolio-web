import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Card, Label, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiInformationCircle } from 'react-icons/hi2'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { env } from '../../config/env'
import { useAuth } from '../../hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const { isAuthenticated, isAdmin, login, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      const nextPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/admin'
      navigate(nextPath, { replace: true })
    }
  }, [isAdmin, isAuthenticated, location.state, navigate])

  async function onSubmit(values: LoginFormValues) {
    setSubmitting(true)
    setError(null)

    try {
      await login(values.email, values.password)
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="section-shell flex min-h-screen items-center justify-center py-12">
        <Card className="w-full max-w-lg rounded-3xl border border-white/70 bg-white/85 shadow-xl shadow-primary-900/5">
          <div>
            <p className="section-kicker w-fit">Admin Login</p>
            <h1 className="text-4xl text-stone-900">Manage your portfolio</h1>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Sign in with the single admin account configured in <code>VITE_ADMIN_EMAIL</code>.
            </p>
          </div>

          {!env.adminEmail ? (
            <Alert color="warning" icon={HiInformationCircle}>
              Admin email is not configured yet. Add <code>VITE_ADMIN_EMAIL</code> before using this area.
            </Alert>
          ) : null}

          {isAuthenticated && !isAdmin ? (
            <Alert color="failure" icon={HiInformationCircle}>
              This session does not match the configured admin email. Sign out and use <strong>{env.adminEmail}</strong>.
            </Alert>
          ) : null}

          {error ? (
            <Alert color="failure" icon={HiInformationCircle}>
              {error}
            </Alert>
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit((values) => void onSubmit(values))}>
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput id="email" className="mt-2" type="email" placeholder="admin@example.com" {...register('email')} color={errors.email ? 'failure' : undefined} />
              {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput id="password" className="mt-2" type="password" placeholder="••••••••" {...register('password')} color={errors.password ? 'failure' : undefined} />
              {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button color="warning" type="submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" className="mr-2" /> : null}
                Sign in
              </Button>
              {isAuthenticated && !isAdmin ? (
                <Button color="light" type="button" onClick={() => void logout()}>
                  Sign out wrong account
                </Button>
              ) : null}
              <Button as={Link} to="/" color="light">
                Back to site
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
