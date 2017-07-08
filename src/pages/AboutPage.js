import React, { Component } from 'react'
import { StyleSheet, View, Text, Linking, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Page from '../containers/Page'
import Container from '../containers/Container'
import ScrollContainer from '../containers/ScrollContainer'
import AboutSection from '../containers/AboutSection'


class AboutPage extends Component {
  constructor(props) {
    super(props)
  }

  handleBack() {
    this.props.navigator.pop()
  }

  emailParker() {
    Linking.openURL("mailto:parker@reflectwithmuse.com?subject=Hi Parker")
  }

  emailJob() {
    Linking.openURL("mailto:parker@reflectwithmuse.com?subject=Job")
  }

  emailOlivier() {
    Linking.openURL("mailto:hello@olivierifrah.com?subject=Hello Olivier")
  }

  loadParker() {
    Linking.openURL("http://www.parkerklein.me")
  }

  loadOlivier() {
    Linking.openURL("https://www.olivierifrah.com")
  }

  handleInstagram() {
    Linking.openURL('https://www.instagram.com/reflectwithmuse/')
  }

  handleTwitter() {
    Linking.openURL('https://twitter.com/reflectwithmuse')
  }

  handleFacebook() {
    Linking.openURL('https://www.facebook.com/reflectwithmuse/')
  }

  render() {
    return (
      <Page>
        <Container>
          <ScrollContainer>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.header}>{"What's Müse?"}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>{"An app for people to reflect\non deep questions and big ideas."}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.last}>
                  <Text style={styles.def}>{"\\myüz\\ v. to think about something\ncarefully and thoroughly"}</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.header}>Mission</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.last}>
                  <Text style={styles.centerParagraph}>{"Help people do what they love,\nreach their full potential,\nand create a better world."}</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.header}>Why Reflect?</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Increase awareness</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Strengthen EQ</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Define goals</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Focus energy</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Practice mindfulness</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Make conscious decisions</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Increase confidence</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Overcome fears</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Improve communication</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Enhance creativity</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Improve writing</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.last}>
                  <Text style={styles.centerParagraph}>Strengthen relationships</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.header}>How?</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>{"Choose a category. Read the prompt.\nReflect."}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.last}>
                  <Text style={styles.centerParagraph}>{"You'll get out what you put in."}</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.header}>Team</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.title}>Creator</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity style={styles.names} onPress={this.loadParker} activeOpacity={.7}><Text style={styles.teamName}>Parker Klein</Text></TouchableOpacity>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>Qualcomm Engineer</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.title}>Branding</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity style={styles.names} onPress={this.loadOlivier} activeOpacity={.7}><Text style={styles.teamName}>Olivier Ifrah</Text></TouchableOpacity>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.last}>
                  <Text style={styles.centerParagraph}>ZipRecruiter Designer</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.header}>Story</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>{"Parker collected questions to learn about\nhimself and what he wanted to do."}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>{"He loved introspection and\nwanted to share it with others."}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>{"He told Olivier about his vision\nand was met with a shared belief."}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.last}>
                  <Text style={styles.centerParagraph}>{"They're helping people learn about\nthemselves and do what they love."}</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.header}>Jobs</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>{"Interested in developing skills\nwhile helping build Müse?"}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity style={styles.email} onPress={this.emailJob} activeOpacity={.7}><Text style={styles.emailName}>Email Us</Text></TouchableOpacity>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.header}>Contact</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>{"We love stories,\nopinions, and questions"}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity style={styles.email} onPress={this.emailParker} activeOpacity={.7}><Text style={styles.emailName}>Parker</Text></TouchableOpacity>
              <TouchableOpacity style={styles.email} onPress={this.emailOlivier} activeOpacity={.7}><View style={styles.last}><Text style={styles.emailName}>Olivier</Text></View></TouchableOpacity>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.regView}>
                  <Text style={styles.header}>Join Us</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={[styles.touchable, styles.last]}>
                <View style={styles.regView}>
                  <Text style={styles.centerParagraph}>{"See our daily prompt.\nLeave other app.\nUse Müse :)"}</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={[styles.socialButtons, styles.last]}>
                <TouchableOpacity onPress={this.handleTwitter} style={styles.socialButton} activeOpacity={.7}>
                  <FontAwesome size={20} name="twitter" color="#777" />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleInstagram} style={styles.socialButton} activeOpacity={.7}>
                  <FontAwesome size={20} name="instagram" color="#777" />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleFacebook} style={styles.socialButton} activeOpacity={.7}>
                  <FontAwesome size={20} name="facebook" color="#777" />
                </TouchableOpacity>
              </View>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View style={styles.last}>
                  <Text style={styles.thankYou}>Thanks For Using Müse :)</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
          </ScrollContainer>
        </Container>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    color: '#967ADC',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  thankYou: {
    fontSize: 24,
    color: '#967ADC',
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  subHeader: {
    fontSize: 16,
    color: '#AAA',
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  centerParagraph: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 8,
    flexShrink: 0,
    alignSelf: 'stretch',
  },
  spacer: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  socialButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    flexShrink: 0,
  },
  socialButton: {
    marginLeft: 15,
    marginRight: 15,
  },
  emailName: {
    fontSize: 16,
    color: '#777',
    paddingTop: 5,
    paddingBottom: 2,
    fontWeight: '700',
    textAlign: 'center',
  },
  teamName: {
    fontSize: 20,
    color: '#777',
    fontWeight: '700',
    textAlign: 'center',
  },
  regView: {
    alignSelf: 'stretch',
  },
  last: {
    paddingBottom: 30,
    alignSelf: 'stretch',
  },
  def: {
    color: '#AAA',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 8,
  },
  touchable: {
    paddingLeft: 12,
    paddingRight: 12,
    alignSelf: 'stretch',
  }
})

export default AboutPage
