import React, { Component } from "react";
import { Image, Modal } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Container, Header, Body, Title, Subtitle, Toast, Footer, FooterTab, Button, Icon, View, Text, Right, Form, Item, Picker, H1 } from "native-base";
import { RNCamera } from "react-native-camera";

import customStyle from "./../styles/CustomStyle";

import config from "./../Config";

export default class QRScreen extends Component {
  static navigationOptions = {
    title: "QR Scanner"
  };

  state = {
    auth: {},
    scanned_qr_data: null,
    scanned_qr_height: null,
    scanned_qr_x: null,
    scanned_qr_y: null,
    continue_scanning: true,
    modal_new_agenda_is_shown: false,
    input_value_agenda: null
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
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            if(!this.state.modal_new_agenda_is_shown && this.state.continue_scanning) {
              if(barcodes[0].type === "QR_CODE") {
                this.setState({
                  scanned_qr_data: barcodes[0].data,
                  scanned_qr_height: barcodes[0].bounds.size.height,
                  scanned_qr_x: barcodes[0].bounds.origin.x,
                  scanned_qr_y: barcodes[0].bounds.origin.y,
                  continue_scanning: false
                });

                this.requestQRAction();
              }
            }
          }}
        >
          {this.renderQR()}
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
            animationType="slide"
            transparent={true}
            visible={this.state.modal_new_agenda_is_shown}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={customStyle.modal}>
              <View style={customStyle.modalContent}>
                <Form style={customStyle.form}>
                  <H1 style={{marginBottom: 10}}>What is your agenda?</H1>
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

  renderQR() {
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

  requestQRAction() {
    fetch(config.server_url + '/api/scan_qr.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        qr_code: this.state.scanned_qr_data,
        account_id: this.state.auth.id
      })
    }).then((resp) => resp.json()).then((response) => {
      Toast.show({
        text: response.message,
        duration: 3000
      });
  
      if(response.status === 'ok' && response.data.type === 'Entrance') {
        this.setState({
          modal_new_agenda_is_shown: true
        });
      }

      setTimeout(() => {
        this.setState({
          continue_scanning: true
        });
      }, 3000);
    }).catch((err) => {
      console.error(err);

      Toast.show({
        text: 'An error has occurred while submitting your request.',
        duration: 3000
      });
    });
  }

  requestAgenda() {
    fetch(config.server_url + '/api/scan_qr.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        qr_code: this.state.scanned_qr_data,
        account_id: this.state.auth.id
      })
    }).then((resp) => resp.json()).then((response) => {
      Toast.show({
        text: response.message,
        duration: 3000
      });
  
      if(response.status === 'ok' && response.data.type === 'Entrance') {
        this.setState({
          modal_new_agenda_is_shown: true
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
