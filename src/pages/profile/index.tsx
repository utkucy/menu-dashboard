import * as React from "react";
import { observer } from "mobx-react";
import { GetServerSideProps } from 'next'
import cookies from "next-cookies";
import styled from 'styled-components'
import { Layout } from 'antd';


import MainHeader from 'layouts/main-header/index'
import UserSettings from 'components/pages/profile/index'
import UserService from "services/user";
import { User } from "models/user";

interface IProfilePageProps {
  user: User
}

@observer
class ProfilePage extends React.Component<IProfilePageProps> {
  render() {
    return (
      <Container>
        <MainHeader user={this.props.user} index={"2"} />
        <UserSettings user={this.props.user}/>
      </Container>
    )
  }
}


const Container = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F7FAFD;
`

const ContentContainer = styled.div`
  /* background: red; */
  height: 100%;
  width: 1100px;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
`


export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...

  const { userId } = cookies(context)
  const user = await UserService.fetchUser(userId!)
  

  // await GlobalStore.fetchUser()

  return {
    props: {
      user
    }
  }
}




export default ProfilePage

