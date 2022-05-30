import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    alignItems: 'center'
  },
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  user: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  action: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignItems: 'center',
    marginHorizontal: 25
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    height: 45,
    borderRadius: 7,
    marginLeft: 10,
    marginVertical: 2,
  },
  commandButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: '25%'
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },

})
export default styles;
