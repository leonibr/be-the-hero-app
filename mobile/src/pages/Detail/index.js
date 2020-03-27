import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

import * as MailComposer from 'expo-mail-composer'
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = 
`Hello ${incident.name},
I am getting in touch because I would like to help this incident: "${incident.title}"
with the amount of ${Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(incident.value)}
 `
    function navigateBack() {
        navigation.goBack();
    }
    function sendMail() {
        MailComposer.composeAsync({
            subject: `Incident: ${incident.title}`,
            recipients: [`${incident.email}`],
            body: message
        })
    }
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG: </Text>
  <Text style={styles.incidentValue}>{incident.name} of {incident.city}-{incident.uf}</Text>
        <Text style={styles.incidentProperty}>INCIDENT: </Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
        <Text style={styles.incidentProperty}>AMOUNT: </Text>
        <Text style={styles.incidentValue}>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(incident.value)}
            </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be this incident hero.</Text>
        <Text style={styles.heroDescription}>Be in touch:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
