import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next"

export default function Dashboard () {
  return (
    <h1> Dashboard </h1>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const session = getSession(req, res);
  
  console.log(session.accessToken)

  return {
    props: {}
  }
}