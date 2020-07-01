import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import styles from './style';
import { connect } from 'react-redux';

// Integrar com formik e validar formulário
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .label('Nome')
        .required('Campo obrigatório'),
    currentPassword: Yup.string()
        .label('Senha Atual')
        .test('required', 'Campo obrigatório', function(value) {
            return (!this.parent.newPassword && !this.parent.confirmPassword) || value;
        }),
    newPassword: Yup.string()
        .label('Nova Senha')
        .test('required', 'Campo obrigatório', function(value) {
            return (!this.parent.currentPassword && !this.parent.confirmPassword) || value;
        })
        .test('min-length', 'Senha deve ter ao menos 6 caracteres', function(value) {
            return (!this.parent.currentPassword && !this.parent.confirmPassword && !value) 
                || value && value.length >= 6;
        }),
    confirmPassword: Yup.string()
        .label('Confirmar Senha')
        .test('required', 'Campo obrigatório', function(value) {
            return (!this.parent.currentPassword && !this.parent.newPassword) || value;
        })
        .oneOf([Yup.ref('newPassword'), null], 'Senhas não correspondem')
});

class Profile extends Component {

    state = {
        isOpen: false,
        photoUser: null,
        hasError: false,
    }

    pickImage = () => {

        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            maxHeight: 100,
            maxWidth: 100
        }, res => {
            this.setState({ photoUser: "data:image/jpeg;base64," + res.data })
            console.log(this.state.photoUser)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header goBack={this.props.navigation.goBack} />
                <View style={styles.contantUser}>
                    <View style={styles.photoContainer}>
                        <Image style={styles.photoUser} source={{ uri: this.state.photoUser }} />
                        <TouchableOpacity style={styles.edit} activeOpacity={0.7} onPress={this.pickImage}>
                            <Icon name="create" size={20} color='#fff' />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{this.props.loggedUser.name}</Text>
                    <Text style={styles.email}>{this.props.loggedUser.email}</Text>
                </View>

                <Formik
                    initialValues={{
                        name: this.props.loggedUser.name,
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => this.onSubmit(values)}>
                    {({ handleChange, values, handleSubmit, errors, touched, handleBlur }) => (
                        <View style={styles.containerForm}>
                            <View style={styles.containerInput}>
                                <Text style={styles.label}>Nome completo</Text>
                                <TextInput
                                    style={[styles.input, !this.state.isOpen ? styles.inputDisabled : ""]}
                                    placeholder="Digite seu nome"
                                    editable={this.state.isOpen ? true : false}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')} />
                                {touched.name && errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
                            </View>

                            <View style={styles.containerEditPassword}>
                                <View style={[styles.containerInput, styles.containerInputPassword]}>
                                    <Text style={styles.label}>Senha atual</Text>
                                    <TextInput
                                        style={[styles.input, !this.state.isOpen ? styles.inputDisabled : ""]}
                                        placeholder="Digite sua senha"
                                        secureTextEntry={true}
                                        editable={this.state.isOpen ? true : false}
                                        value={values.currentPassword}
                                        onChangeText={handleChange('currentPassword')}
                                        onBlur={handleBlur('currentPassword')} />
                                    {errors.currentPassword
                                        && <Text style={{ color: 'red' }}>{errors.currentPassword}</Text>}
                                </View>
                                <TouchableWithoutFeedback onPress={() => { this.setState({ isOpen: true }); }}>
                                    <Text style={styles.editPassword}>Editar dados</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            {
                                this.state.isOpen &&
                                <View style={styles.newPassword}>
                                    <View>
                                        <View style={styles.containerInput}>
                                            <Text style={styles.label}>Nova senha</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Digite uma senha"
                                                secureTextEntry={true}
                                                value={values.newPassword}
                                                onChangeText={handleChange('newPassword')}
                                                onBlur={handleBlur('newPassword')} />
                                            {errors.newPassword
                                                && <Text style={{ color: 'red' }}>{errors.newPassword}</Text>}
                                        </View>

                                        <View style={styles.containerInput}>
                                            <Text style={styles.label}>Confirmar senha</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Digite a senha novamente"
                                                secureTextEntry={true}
                                                value={values.confirmPassword}
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur('confirmPassword')}
                                            />
                                            {errors.confirmPassword
                                            && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
                                        </View>
                                    </View>

                                    <View style={styles.containerBtn}>
                                        <TouchableOpacity onPress={handleSubmit} style={styles.btnSave} activeOpacity={0.7}>
                                            <Text style={styles.txtBtnSave}>Salvar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.btnCancel} activeOpacity={0.7}>
                                            <Text style={styles.txtBtnCancel} onPress={() => { this.setState({ isOpen: !this.state.isOpen }); }}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                    )}
                </Formik>
            </View>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        loggedUser: users.loggedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUser: user => dispatch(updateUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);