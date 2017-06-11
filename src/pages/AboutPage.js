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
                <View>
                  <Text style={styles.header}>Müse</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.subHeader}>(myüz) verb</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>To think about something carefully and thoroughly; to become absorbed in thought</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.header}>Our Mission</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>To help you gain self-awareness through daily reflection so you can create a happier, more meaningful life doing what you love</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.header}>Why Should You Reflect?</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Increase self-awareness and self-regulation</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Strengthen emotional intelligence</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Increase mindfulness</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Clarify goals and core values</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Increase confidence and self-esteem</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Focus time and effort on meaningful actions</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Make conscious-driven decisions</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Learn to confront and overcome fear</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Reduce guilt and regret</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Improve communication skills</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Increase creativity</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Improve writing and memory</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Build healthier relationships</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.header}>What is Müse?</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>A space to slow down and self-reflect on 400+ prompts.</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>We promote self-awareness, mindfulness, positivity, self-love, and personal growth</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.header}>Our Team</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity style={styles.names} onPress={this.loadParker} activeOpacity={.7}><Text style={styles.teamName}>Parker Klein</Text></TouchableOpacity>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.title}>Creator</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Engineer at Qualcomm</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity style={styles.names} onPress={this.loadOlivier} activeOpacity={.7}><Text style={styles.teamName}>Olivier Ifrah</Text></TouchableOpacity>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.title}>Designer</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Designer at ZipRecruiter</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.header}>Our Story</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>On his own spiritual journey, Parker was collecting and answering deep questions to learn about himself and what he wanted to do.</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>He fell in love with the practice of self-reflection and the benefits he was experiencing, and decided to share it with the world.</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>He shared his vision with a classmate from Vanderbilt, Olivier, and was met with excitement and a shared belief.</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>They are now on a mission to help you become more self-aware and and inspire you to do what you love</Text>
                </View>
              </TouchableWithoutFeedback>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.header}>Connect With Us</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>We would love to hear your story, listen to your opinions, and answer your questions</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity style={styles.email} onPress={this.emailParker} activeOpacity={.7}><Text style={styles.emailName}>Parker</Text></TouchableOpacity>
              <TouchableOpacity style={styles.email} onPress={this.emailOlivier} activeOpacity={.7}><Text style={styles.emailName}>Olivier</Text></TouchableOpacity>
            </AboutSection>
            <AboutSection>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.header}>Follow Us</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.touchable}>
                <View>
                  <Text style={styles.centerParagraph}>Everyday, you will see our daily prompt along with other positive and inspiring content</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.socialButtons}>
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
                <View>
                  <Text style={styles.thankYou}>Thank You For Using Müse :)</Text>
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
    color: '#777',
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  thankYou: {
    fontSize: 24,
    color: '#777',
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    color: '#777',
    fontWeight: '600',
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#AAA',
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  centerParagraph: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 8,
    flexShrink: 0,
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
    fontWeight: '600',
    textAlign: 'center',
  },
  teamName: {
    fontSize: 20,
    color: '#424242',
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default AboutPage
