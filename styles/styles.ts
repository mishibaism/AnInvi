import { StyleSheet, Modal, Alert } from 'react-native';
//Left-to-Right
const styles = StyleSheet.create({
  container: { //pondasi
    flex: 1,
    backgroundColor: '#transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  container2: { //area A
    backgroundColor: '#transparent', 
    width: '42%',
    height: '26%',
    flexDirection: 'column' 
  },
  container4: { //area B
    backgroundColor: '#transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '58%',
    height: '26%',
  },
  container3: { //area B.1
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '0%',
    marginLeft: '15%',
  },
  container5: { //area 
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '34%',
    marginLeft: '5%',
  },
  container5a: { //area 
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '34%',
    marginLeft: '11%',

  },
  container6: { 
    backgroundColor: 'transparent',
    marginTop: '18%',
    width: '236%',
    height: '246%',
    flexDirection: 'column'
  },
  container7: {
    backgroundColor: '#transparent',
    marginTop: '5%',
    marginLeft: '23%',
    width: '190%',
    height: '32%',
    flexDirection: 'row',

// QRCodeScreen.tsx

  },
    container1a: {  // NavBar of QRCodeScreen.tsx
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    containera: {  //base
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

// AccountScreen.tsx

    containerb: {  // NavBar of AccountScreen.tsx
    flex: 1,
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    container1b: { // Button
    backgroundColor: 'transparent',
    marginTop: '55%',
    width: '100%',
    height: '60%',
  },
});

export default styles;