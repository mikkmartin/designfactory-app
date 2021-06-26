export default process.env.NEXT_PUBLIC_URL
  ? 'https://' + process.env.NEXT_PUBLIC_URL
  : 'http://localhost:4000'
