import { ScrollView, Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { getMonthName } from "../../utils/helpers";
import styles from "./styles";
import CircularProgess from 'react-native-circular-progress-indicator';
import { GlobalContext } from "../../context/Provider";
import { useContext, useEffect, useState } from "react";
import { getServicesByUser } from "../../services/services.service";
import { FlatList } from "react-native";
import ServiceCard from "../../components/ServiceCard";

const ProfileScreenSeller = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const [services, setServices] = useState([]);
    const { authState: { user } } = useContext(GlobalContext);

    useEffect(() => {
        getServicesByUser(user?.id)
            .then(services => setServices(services))
            .catch(err => ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT));
    }, [])

    return (
        <ScrollView>
            <StatisticsSection />
            <View style={styles?.popularContainer}>
                <Text style={styles?.popularText}>My Services</Text>
                <FlatList
                    horizontal
                    nestedScrollEnabled
                    data={services}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) =>
                        <ServiceCard
                            service={item}
                            onPress={() => navigation.navigate('ServiceDetails', { service: item })}
                        />
                    }
                />
            </View>
        </ScrollView>

    );
}

const StatisticsSection = () => {
    const colorScheme = useColorScheme();
    const { authState } = useContext(GlobalContext);
    return (

        <View style={[styles.statisticsCont, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
            <Text style={styles.statisticsTitle}>
                Statistics
            </Text>
            <View style={[styles.chartsView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <View style={[styles.statisticsView2, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                    <Text style={styles.statisticsText2}>
                        Personal Rating
                    </Text>
                    <CircularProgess
                        progressFormatter={(value) => {
                            'worklet';
                            return value.toFixed(1); // 1 decimal places
                        }}
                        radius={35}
                        activeStrokeWidth={3}
                        maxValue={5}
                        value={authState.user.ratingAsSeller}
                        inActiveStrokeColor={Colors[colorScheme].secondaryBackground}
                        inActiveStrokeOpacity={0.2}
                        duration={2000}
                    />
                </View>
                <View style={[styles.statisticsView2, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                    <Text style={styles.statisticsText2}>
                        Response Rate
                    </Text>
                    <CircularProgess
                        radius={35}
                        activeStrokeWidth={3}
                        value={97}
                        valueSuffix="%"
                        inActiveStrokeColor={Colors[colorScheme].secondaryBackground}
                        inActiveStrokeOpacity={0.2}
                        duration={2000}
                    />
                </View>
                <View style={[styles.statisticsView2, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                    <Text style={styles.statisticsText2}>
                        On Time Delivery
                    </Text>
                    <CircularProgess
                        radius={35}
                        activeStrokeWidth={3}
                        value={88}
                        valueSuffix="%"
                        inActiveStrokeColor={Colors[colorScheme].secondaryBackground}
                        inActiveStrokeOpacity={0.2}
                        duration={2000}
                    />
                </View>
            </View>

            <View style={[styles.seperator, { backgroundColor: Colors[colorScheme].tint }]}></View>
            <View style={[styles.statisticsView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <Text style={styles.statisticsText}>
                    Personal Balance
                </Text>
                <Text style={styles.statisticsText}>
                    {authState.user.balance} TND
                </Text>
            </View>
            <View style={[styles.statisticsView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <Text style={styles.statisticsText}>
                    Average Selling Price
                </Text>
                <Text style={styles.statisticsText}>
                    55 TND
                </Text>
            </View>
            <View style={[styles.statisticsView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <Text style={styles.statisticsText}>
                    Earnings in {getMonthName(new Date().getMonth())}
                </Text>
                <Text style={styles.statisticsText}>
                    4850 TND
                </Text>
            </View>
            <View style={[styles.seperator, , { backgroundColor: Colors[colorScheme].tint }]}></View>
        </View>
    );
}

export default ProfileScreenSeller;