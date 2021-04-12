export default process.env.NEXT_PUBLIC_URL
  ? 'https://' + process.env.NEXT_PUBLIC_URL + '/files'
  : 'http://localhost:4000/files'
