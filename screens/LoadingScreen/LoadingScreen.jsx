import { default as Image } from "../../components/ImageWithFallback"
import { View } from "../../components/Themed"
import { BASE_URL } from "../../services/api.service";
import styles from "./styles";

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={{ uri: BASE_URL + '/static/images/loading.gif' }}
            />
        </View>
    )
}
export default LoadingScreen;