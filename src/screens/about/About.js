import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import Header from '../../components/Header';
import styles from './style';

export default class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header goBack={() => this.props.navigation.navigate('SearchPlaces')} />
        <Text style={styles.title}>Sobre o aplicativo</Text>
        <Image
          style={styles.image}
          source={require('../../../assets/imgs/iluastracao-sobre.png')}
        />
        <Text style={styles.text}>
          {' '}
          Do mesmo modo, o comprometimento entre as equipes possibilita uma
          melhor visão global do levantamento das variáveis envolvidas. Gostaria
          de enfatizar que o fenômeno da Internet exige a precisão e a definição
          dos índices pretendidos. No entanto, não podemos esquecer que a
          estrutura atual da organização auxilia a preparação e a composição da
          gestão inovadora da qual fazemos parte. O empenho em analisar o
          acompanhamento das preferências de consumo obstaculiza a apreciação da
          importância dos níveis de motivação departamental.{' '}
        </Text>
      </View>
    );
  }
}
