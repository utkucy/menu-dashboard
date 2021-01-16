import * as React from "react";
import { Cookies } from "react-cookie";
import styled from 'styled-components'
import { observer } from "mobx-react";
import { observable, action, computed } from "mobx";
import Router from 'next/router';
import {  Menu, Avatar, Divider, Typography, Dropdown, message, Button } from 'antd';
import {
  CaretDownOutlined,
  LogoutOutlined,
  ShopTwoTone
} from '@ant-design/icons';


import { User } from "models/user";
import UserService from "services/user";


interface ILayout {
  // setIndex: (index: string) => void
  index: string
  user: User
}

@observer
class MainHeader extends React.Component<ILayout> {

  @observable collapsed = false

  @action.bound
  menuClick(e: any) {
    if (e.key === "1") {
      Router.push('/menu')
    }
    else if(e.key === "2") {
      Router.push('/profile');
    }
  }

  @action.bound
  onCollapse() {
    this.collapsed = !this.collapsed
  }

  @action.bound
  async onSettingsClick(item: any) {
    if (item.key === "99")
      await UserService.logout()
    const cookies = new Cookies()
    cookies.set("selectedBranchIndex", item.key)
    location.reload()
  }

  @computed
  get menuList() {
    const cookies = new Cookies()
    const key = cookies.get("selectedBranchIndex")
    return (
      <Menu 
      onClick={this.onSettingsClick}
      style={{ padding: 0 }}
      defaultSelectedKeys={[key]}
      >
        {this.props.user.branches?.map((branch, index) => (
          <Menu.Item 
          key={index} 
          icon={<ShopTwoTone style={{ fontSize: 20 }} />} 
          style={{ height: 50, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            {branch.name}
          </Menu.Item>
        ))}
        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
        <Menu.Item key="99">
          <Button type="link" icon={<LogoutOutlined />} >
            Çıkış Yap
          </Button>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <StyledHeader >
        <ContentContainer>
          <Menu 
          onClick={this.menuClick} 
          style={{ 
            display: 'flex', 
            height: '100%', 
            borderBottomWidth: 0, 
            alignItems: 'center', 
            justifyContent: 'center' 
            }} 
            theme="light" 
            mode="horizontal" 
            defaultSelectedKeys={[this.props.index]}
            >   
              <Menu.Item style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }} key="1">Menü</Menu.Item>
              {/* <Menu.Item style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }} key="2">Yemek Kategorileri</Menu.Item> */}
              <Menu.Item style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }} key="2">Profil</Menu.Item>
          </Menu>
          <Divider style={{ borderColor: '#ddd', height: 40, top: 0, marginRight: 20 }} type="vertical" />
          <StyledLogo>
            {/* <TextContainer>
              <LogoText>{this.props.user.restaurant_name}</LogoText>
            </TextContainer>  */}
            <StyledDropDown overlay={this.menuList}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Avatar size={80} src={this.props.user.image_url} />
                <CaretDownOutlined style={{ textAlign: 'center', fontSize: 20, marginLeft: 10, color:'#000' }}/>
              </a>
            </StyledDropDown>
          </StyledLogo>
        </ContentContainer>
      </StyledHeader>
    )
  }
}

const StyledHeader = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  background: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  border-bottom-style: solid;
`

const ContentContainer = styled.div`
  width: 1100px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
`

const StyledLogo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const TextContainer = styled.div`
  margin-right: 20px;
`

const LogoText = styled.h1`
  font-size: 22px;
  color: #000;
  margin: 0; 
  font-weight: 600;
` 

const StyledDropDown = styled(Dropdown)`
  display: flex;
  align-items: center;
`

export default MainHeader
