import React from "react";
import { useState, useEffect } from "react";
import { Agenda, DateData, AgendaEntry, AgendaSchedule, LocaleConfig } from 'react-native-calendars';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import moment from 'moment';

import database from "../../services/firebase";
import { ref, get, set } from "firebase/database";

LocaleConfig.locales['pt-BR'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: "Hoje",
};
LocaleConfig.defaultLocale = 'pt-BR';

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});



const Home = () => {
    const [horarios, setHorarios] = useState<AgendaSchedule | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        loadHorarios();
    }, [])

    const deleteReservation = async (reservation: any) => {
        setLoading(true);
        await set(ref(database, 'horarios/' + reservation.day + '/' + reservation.horario), null)
        loadHorarios();
    }

    const loadHorarios = async () => {
        setLoading(true);
        let items: any = {}

        const horariosRef = ref(database, 'horarios');

        var horarios: any = await get(horariosRef)
        horarios = horarios.val()

        let dias = Object.keys(horarios)

        for (let i = 0; i < dias.length; i++) {
            const dia: any = dias[i]

            const formatedDay = moment(dia, 'DD-MM-YYYY').format('YYYY-MM-DD')

            items[formatedDay] = []

            let horariosDoDia = Object.keys(horarios[dia])

            for (let j = 0; j < horariosDoDia.length; j++) {

                let horario: any = horariosDoDia[j]

                if (horarios[dia][horario].confirmado)
                    items[formatedDay].push({
                        day: dia,
                        horario: horario,
                        servico: horarios[dia][horario].servico,
                        telefone: horarios[dia][horario].telefone,
                        height: 100
                    });
            }
        }

        const newItems: AgendaSchedule = {};

        Object.keys(items).forEach(key => {
            newItems[key] = items[key];
        });
        console.log(items)

        console.log(newItems)
        setHorarios(newItems);
        setLoading(false);
    }

    const renderItem = (reservation: any, isFirst: boolean) => {

        const color = isFirst ? 'black' : '#43515c';

        return (
            <TouchableOpacity
                testID={'id'}
                style={[styles.item, { height: reservation.height }]}
                onPress={() => {
                    Alert.alert(
                        'Remover agendamento',
                        'Você tem certeza que deseja apagar este agendamento?',
                        [
                            {
                                text: 'Cancelar',
                            },
                            {
                                text: 'Sim',
                                onPress: () => deleteReservation(reservation),
                            },
                        ],
                        { cancelable: true }
                    )
                }}
            >
                <Text style={{ fontSize: 25, color }}>{reservation.horario} - {reservation.servico}</Text>
                <Text style={{ fontSize: 20, color }}>Telefone: {reservation.telefone.replace("whatsapp:", "")}</Text>
            </TouchableOpacity >
        );
    }

    const renderEmptyDate = () => {

        return (
            <View style={styles.emptyDate}>
                <Text>Não há agendamentos para esse dia</Text>
            </View>
        );
    }

    const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    }

    const timeToString = (time: number) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    return (
        <>
            <Spinner
                visible={loading}
                textContent={'Carregando...'}
            />
            <Agenda
                items={horarios}
                selected={moment().format("YYYY-MM-DD")}
                //minDate={moment().format("YYYY-MM-DD")}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}
                showClosingKnob={true}
                enableSwipeMonths={true}
                
            />
        </>

    );
};

export default Home;
