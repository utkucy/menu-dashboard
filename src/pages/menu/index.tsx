import * as React from "react";
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";
import Router from 'next/router';
import { GetServerSideProps } from 'next'
import cookies from "next-cookies";

import styled from 'styled-components'
import { Empty, Button  } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

import MainHeader from 'layouts/main-header/index'
import MenuContent from 'components/pages/menu'

import UserService from "services/user";
import { User } from "models/user";
import { Menu } from "models/menu";
import { Branch } from "models/branch";


interface IMenuPageProps {
  user: User
  branch: Branch
  menu: Menu
}

@observer
class MenuPage extends React.Component<IMenuPageProps> {


  addCategory() {
    Router.push('/category/new')
  }


  render() {
    // const menu = this.props.user.branches?.find((branch, index) => { index === 0 })
   console.log(this.props.menu)

    return (
      <Container>
        <MainHeader user={this.props.user} index={"1"}/>
        <ContentContainer>
          {this.props.menu.categories?.length === 0
          ?
            <AddCategoryButtonContainer>
              <Empty 
                style={{marginTop: 0, marginRight: 0, marginLeft: 0, justifyContent: 'center', alignItems: 'center' }}
                description="Menünüz şuan boş gözüküyor"
              />
              <Button 
                icon={<PlusOutlined />} 
                type="primary" 
                style={{ marginTop: 20 }}
                onClick={this.addCategory}
              >
                Kategori Ekle
              </Button>
          </AddCategoryButtonContainer>
          :
            <MenuContent menu={this.props.menu} />
          }
          
        </ ContentContainer>
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
  margin-top: 100px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 12px 24px rgba(132, 153, 193, 0.08);
`

const AddCategoryButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...

  const { userId } = cookies(context)
  const user: User = await UserService.fetchUser(userId!)
  const branch = user.branches![0]
  const menu = branch.menu!

  console.log(user, branch, menu)


  // console.log("USEEEER" + user);

  return {
    props: {
      user,
      branch,
      menu
    }
  }
}

export default MenuPage

