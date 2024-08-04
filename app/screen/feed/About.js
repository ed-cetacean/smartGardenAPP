

// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';

// -------------------------------------------------------------------------- //

const AboutScreen = () => {
    const { themePallete } = useTheme();

    const teamMembers = [
        {
            name: 'ANGEL AMIEVA',
            role1: 'IoT Developer',
            role2: 'Web Developer',
            email: 'angel.amieva@outlook.com',
            image: 'https://i.pinimg.com/736x/b9/23/e3/b923e3546251621205662f3cbd1cb402.jpg',
        },
        {
            name: 'ED RUBIO',
            role1: 'Project Manager',
            role2: 'Mobile/Web Developer',
            email: 'ed.cetacean@outlook.com',
            image: 'https://i.pinimg.com/736x/09/0e/f0/090ef0420bbf959033d050f0f3449d3e.jpg',
        },
        {
            name: 'EFRAIN DAVILA',
            role1: 'Web Developer',
            role2: 'Database/API Developer',
            email: 'efrain.davila@outlook.com',
            image: 'https://www.recreoviral.com/wp-content/uploads/2016/07/6-60-700x700.jpg',
        },
    ];

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>NUESTRO EQUIPO DE DESARROLLO</Text>
            </View>

            {/* INFORMACIÓN */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                <RNBounceable style={styles.memberContainer}>
                    <Image source={{ uri: teamMembers[0].image }} style={styles.memberImage} />

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoName}>{teamMembers[0].name}</Text>
                        <Text style={styles.infoRole}>{teamMembers[0].role1}</Text>
                        <Text style={styles.infoRole}>{teamMembers[0].role2}</Text>

                        <View style={styles.separator}></View>

                        <View style={styles.emailContainer}>
                            <Icon name='email' size={SIZES.medium + 2} color={COLORS.light} style={styles.emailIcon} />
                            <Text style={styles.infoEmail}>{teamMembers[0].email}</Text>
                        </View>
                    </View>

                </RNBounceable>

                <RNBounceable style={styles.memberContainer}>
                    <Image source={{ uri: teamMembers[1].image }} style={styles.memberImage} />

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoName}>{teamMembers[1].name}</Text>
                        <Text style={styles.infoRole}>{teamMembers[1].role1}</Text>
                        <Text style={styles.infoRole}>{teamMembers[1].role2}</Text>

                        <View style={styles.separator}></View>

                        <View style={styles.emailContainer}>
                            <Icon name='email' size={SIZES.medium + 2} color={COLORS.light} style={styles.emailIcon} />
                            <Text style={styles.infoEmail}>{teamMembers[1].email}</Text>
                        </View>
                    </View>

                </RNBounceable>

                <RNBounceable style={styles.memberContainer}>
                    <Image source={{ uri: teamMembers[2].image }} style={styles.memberImage} />

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoName}>{teamMembers[2].name}</Text>
                        <Text style={styles.infoRole}>{teamMembers[2].role1}</Text>
                        <Text style={styles.infoRole}>{teamMembers[2].role2}</Text>

                        <View style={styles.separator}></View>

                        <View style={styles.emailContainer}>
                            <Icon name='email' size={SIZES.medium + 2} color={COLORS.light} style={styles.emailIcon} />
                            <Text style={styles.infoEmail}>{teamMembers[2].email}</Text>
                        </View>
                    </View>

                </RNBounceable>

            </ScrollView>

        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        padding: 40, paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ---------------------------------------------------------------------- //

    titleContainer: {
        width: '100%', height: '10%',
        alignItems: 'center', justifyContent: 'center',
    },

    titleText: {
        fontWeight: 'bold',
        color: COLORS.accent,
        fontSize: SIZES.large + 2,
    },

    // ---------------------------------------------------------------------- //

    scrollContainer: {
        width: '100%',
    },

    // ---------------------------------------------------------------------- //

    memberContainer: {
        borderRadius: 12,
        marginVertical: 70,
        alignItems: 'center',
        elevation: 4,
        width: '100%', minHeight: 240,
        backgroundColor: COLORS.accent,
    },

    memberImage: {
        borderWidth: 4,
        borderColor: COLORS.accent,
        marginTop: -60,
        borderRadius: 100,
        position: 'absolute',
        width: 160, height: 160,
        alignItems: 'center', justifyContent: 'center',
    },

    // ---------------------------------------------------------------------- //

    infoContainer: {
        width: '80%',
        marginTop: 100, padding: 20, marginBottom: 8,
        flexDirection: 'column', alignItems: 'center',
    },

    infoName: {
        letterSpacing: 1,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: COLORS.light,
        fontSize: SIZES.large + 2,
    },

    infoRole: {
        paddingBottom: 2,
        color: COLORS.light,
        fontSize: SIZES.medium - 2,
    },

    // ---------------------------------------------------------------------- //

    separator: {
        width: '100%', height: 1,
        backgroundColor: COLORS.light,
        marginTop: 20, marginBottom: 20,
    },

    // ---------------------------------------------------------------------- //

    emailContainer: {
        flexDirection: 'row', alignItems: 'center',
    },

    emailIcon: {
        paddingRight: 10,
    },

    infoEmail: {
        letterSpacing: 1,
        color: COLORS.light,
        fontSize: SIZES.medium - 2,
    },

});

// -------------------------------------------------------------------------- //

export default AboutScreen;

// -------------------------------------------------------------------------- //
