import { useContext} from 'react';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { ScrollView, Text, View, TextInput } from '../../components/Themed';
import { Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import 'react-native-gesture-handler';
import styles from './styles';


const EditProfileScreen = ({ navigation }) => {
  const { authState, authDispatch } = useContext(GlobalContext);
  const colorScheme = useColorScheme();
  const getRandomImageURI = () => "https://picsum.photos/" + (Math.random() * (100) + 200).toFixed(0);
  return (
    <ScrollView style={styles?.container}>
      <View style={styles?.viewContainer}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)} >
            <View style={styles?.imageContainer}>
              <Image
                source={{ uri: getRandomImageURI() }}
                style={styles.photo}
                imageStyle={{ borderRadius: 15 }}>
              </Image>
            </View>
          </TouchableOpacity>
          <Text style={styles.user}>
            {authState.user?.firstName + " " + authState.user?.lastName}
          </Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={Colors[colorScheme].tint} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: Colors[colorScheme].tint,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={Colors[colorScheme].tint} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: Colors[colorScheme].tint,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={Colors[colorScheme].tint} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: Colors[colorScheme].tint,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={Colors[colorScheme].tint} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: Colors[colorScheme].tint,
              },
            ]}
          />
        </View>
        <TouchableOpacity style={[styles.commandButton, {
          color: Colors[colorScheme].tint,
        },]} onPress={() => { }}>
          <Text style={[styles.panelButtonTitle, {
            color: Colors[colorScheme].tint,
          },]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
export default EditProfileScreen;