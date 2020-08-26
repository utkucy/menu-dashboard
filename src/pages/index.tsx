import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Router from 'next/router';

import styled from 'styled-components'
import { Button } from 'antd';

import { Branch } from "models/branch";
import { PartialMenu } from "models/menu";

interface IHomePageProps {
  branch: Branch
}

@observer
class HomePage extends React.Component<IHomePageProps> {

  @observable menu: PartialMenu

  constructor(props: IHomePageProps) {
    super(props)
    this.menu = new PartialMenu()
  }

  login() {
    Router.push('/login')
  }

  render() {
    return (
      <Container>
        {/* <MainHeader index={"1"}/>
        <ContentContainer>
          <Empty style={{marginTop: 100, marginRight: 0, marginLeft: 0, justifyContent: 'center', alignItems: 'center' }} description="Menünüz şuan boş gözüküyor. Kategori ve ürünlerinizi eklemek için Kategoriler sayfasından başlayabilirsiniz."/>
        </ ContentContainer> */}
        <Button onClick={this.login} type="primary">Login</Button>
      </Container>
    )
  }
}


const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ContentContainer = styled.div`
  /* background: red; */
  height: 100%;
  width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...
//   const branch: PartialBranch = {
//     id: 3,
//     name: "Timboo Cafe",
//     address: "Arcadium Çayyolu/Ankara",
//     telephone: "0312 234 23 41"
//   }

//   return {
//     props: {
//       branch
//     }
//   }
// }

export default HomePage

