import * as React from "react";
import styled from 'styled-components'
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";

import UserInformationSection from './user-information-section'
import BranchInformationSection from './branch-information-section'
import { User } from "models/user";


interface IUserSettingsProps {
  user: User
}

@observer
class UserSettingsContent extends React.Component<IUserSettingsProps> {
  render() {
    return(
      <Container>
        <UserInformationSection user={this.props.user} />
        <BranchInformationSection user={this.props.user} />
      </Container>
    )
  }
}


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default UserSettingsContent