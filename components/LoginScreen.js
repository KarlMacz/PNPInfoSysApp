import React, { Component } from "react";
import { Image } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Body, Card, CardItem, Toast, Button, View, Text, Title, Subtitle, Form, Item, Input } from "native-base";

import customStyle from "./../styles/CustomStyle";

import config from "./../Config";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    input_value_email: null,
    input_value_password: null
  }

  constructor(props) {
    super(props);

    this.input_ref = {
      email: null,
      password: null
    };

    AsyncStorage.getItem('auth').then((result) => {
      if(result !== null) {
        this.props.navigation.navigate('Home');
      }
    });
  }

  render() {
    return (
      <View style={[customStyle.wholePage, customStyle.bgPrimary]}>
        <Card style={{width: "90%"}}>
          <CardItem>
            <Body>
              <Form style={customStyle.form}>
                <View style={{marginBottom: 30, width: "100%"}}>
                  <View style={{alignItems: "center"}}>
                    <Image style={{height: 110, width: 80, marginBottom: 20}} source={require("../images/pnp_logo.png")} />
                  </View>
                  <Title style={[customStyle.fgBlack, {fontSize: 40}]}>Information System</Title>
                  <Subtitle style={[customStyle.fgBlack, {fontSize: 20}]}>Philippine National Police</Subtitle>
                </View>
                <Item rounded style={customStyle.formGroup}>
                  <Input
                    style={customStyle.formInputPadding}
                    ref={(input) => {
                      this.input_ref.email = input;
                    }}
                    placeholder="Enter E-mail Address"
                    onChangeText={(text) => {
                      this.setState({
                        input_value_email: text
                      });
                    }}
                    textContentType="emailAddress"
                    autoCompleteType="email" />
                </Item>
                <Item rounded style={customStyle.formGroup}>
                  <Input
                    style={customStyle.formInputPadding}
                    ref={(input) => {
                      this.input_ref.password = input;
                    }}
                    placeholder="Enter Password"
                    onChangeText={(text) => {
                      this.setState({
                        input_value_password: text
                      });
                    }}
                    textContentType="password"
                    secureTextEntry={true} />
                </Item>
                <View style={[customStyle.alignItemsCenter, {marginTop: 30}]}>
                  <Button rounded large
                    style={customStyle.button}
                    onPress={() => {
                      this.requestLogin();
                    }}
                  >
                    <Text>Log In</Text>
                  </Button>
                </View>
              </Form>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }

  requestLogin() {
    fetch(config.server_url + '/api/auth.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.input_value_email,
        password: this.state.input_value_password
      })
    }).then((resp) => resp.json()).then((response) => {
      Toast.show({
        text: response.message,
        duration: 3000
      });
  
      if(response.status === 'ok') {
        AsyncStorage.setItem('auth', JSON.stringify(response.data)).then(() => {
          this.props.navigation.navigate("Home");
        });
      }
    }).catch((err) => {
      Toast.show({
        text: 'An error has occurred while submitting your request.',
        duration: 3000
      });
    });
  }
}
