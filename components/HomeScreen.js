import React, { Component } from "react";
import { Image } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Container, Header, Body, Title, Subtitle, Content, Card, CardItem, Thumbnail, Footer, FooterTab, Button, Icon, View, Text, Left, Right, H1 } from "native-base";

import customStyle from "./../styles/CustomStyle";

import config from "./../Config";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    auth: {}
  };

  constructor(props) {
    super(props);

    AsyncStorage.getItem('auth').then((result) => {
      if(result === null) {
        this.props.navigation.navigate('Login');
      } else {
        this.setState({
          auth: JSON.parse(result)
        });
      }
    });
  }

  render() {
    return (
      <Container>
        <Header style={customStyle.header}>
          <Body style={customStyle.headerBody}>
            <Image style={customStyle.headerBodyIcon} source={require("../images/pnp_logo.png")} />
            <View style={customStyle.headerBodyContent}>
              <Title>Information System</Title>
              <Subtitle>Philippine National Police</Subtitle>
            </View>
          </Body>
          <Right>
            <Button transparent
              style={customStyle.button}
              onPress={() => {
                this.requestLogout();
              }} 
            >
              <Text>Log Out</Text>
            </Button>
          </Right>
        </Header>
        <Content style={customStyle.content}>
          <Card>
            <CardItem style={customStyle.cardItemColumn}>
              <View style={customStyle.level}>
                <View style={customStyle.levelItem}>
                  <Text style={customStyle.levelItemHeading}>Current Agenda</Text>
                  <Text style={customStyle.levelItemTitle}>{(this.state.auth.current_agenda !== null ? this.state.auth.current_agenda : 'None')}</Text>
                </View>
              </View>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Left>
                <Thumbnail source={{uri: config.server_url + '/uploads/' + this.state.auth.avatar}} />
                <Body>
                  <Text>{this.state.auth.full_name}</Text>
                  <Text note>{this.state.auth.type}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={customStyle.cardItemColumn}>
              <View>
                <H1 style={customStyle.textCenter}>Personal Information</H1>
              </View>
              <View style={customStyle.table}>
                <View style={customStyle.tableRow}>
                  <View style={[customStyle.tableCell, customStyle.alignItemsCenter, {flex: 0.5}]}>
                    <Text>Address</Text>
                  </View>
                  <View style={customStyle.tableCell}>
                    <Text style={customStyle.fontWeightBold}>{this.state.auth.address}</Text>
                  </View>
                </View>
                <View style={customStyle.tableRow}>
                  <View style={[customStyle.tableCell, customStyle.alignItemsCenter, {flex: 0.5}]}>
                    <Text>Birth Date</Text>
                  </View>
                  <View style={customStyle.tableCell}>
                    <Text style={customStyle.fontWeightBold}>{this.state.auth.birth_date}</Text>
                  </View>
                </View>
                <View style={customStyle.tableRow}>
                  <View style={[customStyle.tableCell, customStyle.alignItemsCenter, {flex: 0.5}]}>
                    <Text>Sex</Text>
                  </View>
                  <View style={customStyle.tableCell}>
                    <Text style={customStyle.fontWeightBold}>{this.state.auth.sex}</Text>
                  </View>
                </View>
              </View>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button active onPress={() => this.props.navigation.navigate("Home")}>
              <Icon active name="home" />
              <Text>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate("QR")}>
              <Icon name="md-qr-scanner" />
              <Text>Scan QR Code</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  requestLogout() {
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  }
}
