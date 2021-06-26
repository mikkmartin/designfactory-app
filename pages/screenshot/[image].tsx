export const Screenshot = props => {
  return (
    <>
      <h1>Screenshot</h1>
      {JSON.stringify(props, null, 2)}
    </>
  )
}

Screenshot.getInitialProps = async ({ query }) => {
  return {
    query,
  }
}

export default Screenshot
