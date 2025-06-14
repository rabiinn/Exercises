const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <>
      <div><b> Log in to application</b> </div>
      <form onSubmit={handleLogin}>
        <div>username <input type='text' placeholder="username" value={username} onChange={({ target }) => setUsername(target.value)}/></div>
        <div>password <input type='text' placeholder="password" value={password} onChange={({ target }) => setPassword(target.value)}/></div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default LoginForm