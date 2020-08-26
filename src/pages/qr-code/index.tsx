import * as React from "react";
import { observer } from "mobx-react";
import { GetServerSideProps } from 'next'
import cookies from "next-cookies";
import styled from 'styled-components'
import {
  QrcodeOutlined
} from '@ant-design/icons';

import MainHeader from '../../layouts/main-header/index'

import UserService from "services/user";
import { User } from "models/user";

interface IQRPageProps {
  user: User
}

@observer
class QRPage extends React.Component<IQRPageProps> {
  render() {
    return (
      <Container>
        <MainHeader user={this.props.user} index={"2"} />
        <ContentContainer>
          <QrcodeOutlined  style={{ fontSize: 80, marginLeft: 10, color:'#000' }} />
        </ ContentContainer>
      </Container>
    )
  }
}


const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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




export default QRPage

