import React, { Component } from "react";
import { Image, Modal } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Container, Header, Body, Title, Subtitle, Toast, Footer, FooterTab, Button, Icon, View, Text, Right, Form, Item, Picker } from "native-base";
import { RNCamera } from "react-native-camera";

import customStyle from "./../styles/CustomStyle";

import config from "./../Config";

export default class PlateNumberScreen extends Component {
  static navigationOptions = {
    title: "QR Scanner"
  };

  state = {
    auth: {},
    scanned_plate_number_data: null,
    modal_vehicle_info_is_shown: false
  };

  constructor(props) {
    super(props);

    this.input_ref = {
      agenda: null
    };

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
        <RNCamera
          ref={(ref) => {this.camera = ref;}}
          style={{flex: 1, width: "100%"}}
          captureAudio={false}
          onTextRecognized={({textBlocks}) => {
            if(textBlocks.length > 0) {
              let biggestText = textBlocks.reduce((prev, current) => {
                if(prev.bounds.size.height > current.bounds.size.height) {
                  return prev;
                } else if(prev.bounds.size.height < current.bounds.size.height) {
                  return current;
                } else {
                  if(prev.bounds.size.width > current.bounds.size.width) {
                    return prev;
                  } else {
                    return current;
                  }
                }
              });

              this.setState({
                scanned_plate_number_data: biggestText.value
              });

              this.requestPlatNumberAction();
            }
          }}
        >
          {this.renderPlateNumber()}
        </RNCamera>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate("Home")}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button active onPress={() => this.props.navigation.navigate("QR")}>
              <Icon active name="md-qr-scanner" />
              <Text>Scan QR Code</Text>
            </Button>
          </FooterTab>
        </Footer>
        <View>
          <Modal
            style={customStyle.modal}
            animationType="slide"
            transparent={true}
            visible={this.state.modal_vehicle_info_is_shown}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={customStyle.modalContent}>
              <Form style={customStyle.form}>
                <View style={{marginBottom: 30, width: "100%"}}>
                  <View style={{alignItems: "center"}}>
                    <Image style={customStyle.headerBodyIconLg} source={require("../images/pnp_logo.png")} />
                  </View>
                  <Title style={[customStyle.fgBlack, {fontSize: 40}]}>Information System</Title>
                  <Subtitle style={[customStyle.fgBlack, {fontSize: 20}]}>Philippine National Police</Subtitle>
                </View>
                <Item rounded style={customStyle.formGroup}>
                  <Picker
                    ref={(input) => {
                      this.input_ref.password = input;
                    }}
                    mode="dropdown"
                    iosHeader="Select an option..."
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={this.state.input_value_agenda}
                    onValueChange={(text) => {
                      this.setState({
                        input_value_agenda: text
                      });
                    }}
                  >
                    <Picker.Item label="Vehicle Clearance" value="Vehicle Clearance" />
                    <Picker.Item label="Firearm License" value="Firearm License" />
                  </Picker>
                </Item>
                <View style={[customStyle.alignItemsCenter, {marginTop: 30}]}>
                  <Button rounded large
                    style={customStyle.button}
                    onPress={() => {
                      this.requestAgenda();
                    }}
                  >
                    <Text>Submit</Text>
                  </Button>
                </View>
              </Form>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }

  requestLogout() {
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  }

  renderPlateNumber() {
    let height = this.state.scanned_qr_height;
    let x = this.state.scanned_qr_x;
    let y = this.state.scanned_qr_y;
    
    if(this.state.scanned_qr_data !== null) {
      return (
        <View style={[customStyle.qr, {position: "absolute", top: y, left: x, height: height, width: height}]}>
        </View>
      );
    } else {
      return null;
    }
  }

  requestPlateNumberAction() {
    fetch(config.server_url + '/api/scan_plate_number.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        qr_code: this.state.scanned_qr_data
      })
    }).then((resp) => resp.json()).then((response) => {
      Toast.show({
        text: response.message,
        duration: 3000
      });
  
      if(response.status === 'ok') {
        this.setState({
          modal_vehicle_info_is_shown: true
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
