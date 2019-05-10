import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,

    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    SectionList,
    SafeAreaView,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import firebase from 'react-native-firebase';
import { SEND_OTP, DEBUG, UPDATE_USER_AREA, LANDING_TOP_SIX } from '../../../Apis';
import { authHeaders, normalize, getUserID, saveUserData, APP_GLOBAL_COLOR, saveUserID } from '../../../Constant';
import Accordion from 'react-native-collapsible/Accordion';
import Loading from 'react-native-whc-loading';
import CustomButton from "../../components/UI/ButtonMod/CustomButtom";
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

import KochavaTracker from 'react-native-kochava-tracker';
export default class AreaScreen extends Component {
    static propTypes = {
        componentId: PropTypes.string,
    };

    state = {

        data: [],
        originalData: [],
        searchState: '',
        searchContituency: '',

        searchContituencyList: [],

        selectedContituency: null,
        selectedStateData: null

    }
    // user_id = 1;
    sectionSelected = -1;
    constructor(props) {
        super(props);
        // this.pushScreen = this.pushScreen.bind (this);
    }

    componentDidMount() {


        // return;
        // this.getDataFromServer(true)
        firebase.analytics().setCurrentScreen("Screen", "Area_Selection_Screen");
        //firebase.analytics().logEvent("Trends_Screen");
        firebase.analytics().setUserProperty("Screen", "Area_Selection_Screen");
        firebase.analytics().logEvent("Content", { "Screen": "Area_Selection_Screen" });




        var eventMapObject = {};
        eventMapObject["screen_name"] = "Area_Selection_Screen";
        KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);


        // getUserID().then((value) => {
        //     this.user_id = value;
        //     // alert(value);
        // })


        // const item = JSON.parse(retrievedItem);

        var dict = this.props.data;
        // var dict = {
        //     "S01_Andhra Pradesh": ["Achanta", "Addanki", "Adoni", "Allagadda", "Alur", "Amadalavalasa", "Amalapuram (SC)", "Anakapalle", "Anantapur Urban", "Anaparthy", "Araku Valley (ST)", "Atmakur", "Avanigadda", "Badvel (SC)", "Banaganapalle", "Bapatla", "Bhimavaram", "Bhimili", "Bobbili", "Chandragiri", "Cheepurupalle", "Chilakaluripet", "Chintalapudi (SC)", "Chirala", "Chittoor", "Chodavaram", "Darsi", "Denduluru", "Dharmavaram", "Dhone", "Eluru", "Etcherla", "Gajapathinagaram", "Gajuwaka", "Gangadhara Nellore (SC)", "Gannavaram", "Gannavaram (SC)", "Giddalur", "Gopalapuram (SC)", "Gudivada", "Gudur (SC)", "Guntakal", "Guntur East", "Guntur West", "Gurajala", "Hindupur", "Ichchapuram", "Jaggampeta", "Jaggayyapeta", "Jammalamadugu", "Kadapa", "Kadiri", "Kaikalur", "Kakinada City", "Kakinada Rural", "Kalyandurg", "Kamalapuram", "Kandukur", "Kanigiri", "Kavali", "Kodumur (SC)", "Kodur (SC)", "Kondapi (SC)", "Kothapeta", "Kovur", "Kovvur (SC)", "Kuppam", "Kurnool", "Kurupam (ST)", "Macherla", "Machilipatnam", "Madakasira (SC)", "Madanapalle", "Madugula", "Mandapeta", "Mangalagiri", "Mantralayam", "Markapuram", "Mummidivaram", "Mydukur", "Mylavaram", "Nagari", "Nandigama (SC)", "Nandikotkur (SC)", "Nandyal", "Narasannapeta", "Narasapuram", "Narasaraopet", "Narsipatnam", "Nellimarla", "Nellore City", "Nellore Rural", "Nidadavole", "Nuzvid", "Ongole", "Paderu (ST)", "Palacole", "Palakonda (ST)", "Palamaner", "Palasa", "Pamarru (SC)", "Panyam", "Parchur", "Parvathipuram (SC)", "Pathapatnam", "Pattikonda", "Payakaraopet (SC)", "Pedakurapadu", "Pedana", "Peddapuram", "Penamaluru", "Pendurthi", "Penukonda", "Pileru", "Pithapuram", "Polavaram (ST)", "Ponnur", "Prathipadu", "Prathipadu (SC)", "Proddatur", "Pulivendla", "Punganur", "Puthalapattu (SC)", "Puttaparthi", "Rajahmundry City", "Rajahmundry Rural", "Rajam (SC)", "Rajampet", "Rajanagaram", "Ramachandrapuram", "Rampachodavaram(ST)", "Raptadu", "Rayachoti", "Rayadurg", "Razole (SC)", "Repalle", "Salur (ST)", "Santhanuthalapadu (SC)", "Sarvepalli", "Sattenapalle", "Satyavedu (SC)", "Singanamala (SC)", "Srikakulam", "Srikalahasti", "Srisailam", "Srungavarapukota", "Sullurpeta (SC)", "Tadepalligudem", "Tadikonda (SC)", "Tadpatri", "Tanuku", "Tekkali", "Tenali", "Thamballapalle", "Tirupati", "Tiruvuru (SC)", "Tuni", "Udayagiri", "Undi", "Ungutur", "Uravakonda", "Vemuru (SC)", "Venkatagiri", "Vijayawada Central", "Vijayawada East", "Vijayawada West", "Vinukonda", "Visakhapatnam East", "Visakhapatnam North", "Visakhapatnam South", "Visakhapatnam West", "Vizianagaram", "Yelamanchili", "Yemmiganur", "Yerragondapalem (SC)"],
        //     "S02_Arunachal Pradesh": ["Along East", "Along West", "Anini", "Bameng", "Basar", "Bomdila", "Bordumsa-Diyum", "Borduria- Bagapani", "Changlang North", "Changlang South", "Chayangtajo", "Chowkham", "Dambuk", "Damporijo", "Daporijo", "Dirang", "Doimukh", "Hauyuliang", "Itanagar", "Kalaktang", "Kanubari", "Khonsa East", "Khonsa West", "Koloriang", "Lekang", "Likabali", "Liromoba", "Longding-Pumao", "Lumla", "Mariyang-Geku", "Mebo", "Mechuka", "Miao", "Mukto", "Nacho", "Nampong", "Namsai", "Namsang", "Nari-Koyu", "Nyapin", "Pakke-Kasang", "Palin", "Pangin", "Pasighat East", "Pasighat West", "Pongchou-Wakka", "Raga", "Roing", "Rumgong", "Sagalee", "Seppa East", "Seppa West", "Tali", "Taliha", "Tawang", "Tezu", "Thrizino-Buragaon", "Tuting-Yinkgkiong", "Yachuli", "Ziro-Hapoli"],
        //     "S03_Assam": ["Abhayapuri North", "Abhayapuri South", "Algapur", "Amguri", "Badarpur", "Baghbar", "Baithalangso", "Barama", "Barchalla", "Barhampur", "Barkhetry", "Barkhola", "Barpeta", "Batadroba", "Behali", "Bhabanipur", "Bihpuria", "Bijni", "Bilasipara East", "Bilasipara West", "Biswanath", "Bokajan", "Bokakhat", "Boko", "Bongaigaon", "Chabua", "Chapaguri", "Chaygaon", "Chenga", "Dalgaon", "Dergaon", "Dhakuakhana", "Dharmapur", "Dhekiajuli", "Dhemaji", "Dhing", "Dholai", "Dhubri", "Dibrugarh", "Digboi", "Diphu", "Dispur", "Doom Dooma", "Dudhnai", "Duliajan", "Gauhati East", "Gauhati West", "Gauripur", "Goalpara East", "Goalpara West", "Gohpur", "Golaghat", "Golakganj", "Gossaigaon", "Haflong", "Hailakandi", "Hajo", "Hojai", "Howraghat", "Jagiroad", "Jaleswar", "Jalukbari", "Jamunamukh", "Jania", "Jonai", "Jorhat", "Kalaigaon", "Kaliabor", "Kamalpur", "Karimganj North", "Karimganj South", "Katigora", "Katlicherra", "Khumtai", "Kokrajhar East", "Kokrajhar West", "Laharighat", "Lahowal", "Lakhimpur", "Lakhipur", "Lumding", "Mahmara", "Majbat", "Majuli", "Mangaldoi", "Mankachar", "Margherita", "Mariani", "Marigaon", "Moran", "Naharkatia", "Nalbari", "Naoboicha", "Nazira", "Nowgong", "Palasbari", "Panery", "Patacharkuchi", "Patharkandi", "Raha", "Rangapara", "Rangiya", "Ratabari", "Rupohihat", "Sadiya", "Salmara South", "Samaguri", "Sarukhetri", "Sarupathar", "Sibsagar", "Sidli", "Silchar", "Sipajhar", "Sonai", "Sonari", "Sootea", "Sorbhog", "Tamulpur", "Teok", "Tezpur", "Thowra", "Tingkhong", "Tinsukia", "Titabar", "Udalguri", "Udharbond"],
        //     "S04_Bihar": ["Agiaon (SC)", "Alamnagar", "Alauli (SC)", "Alinagar", "Amarpur", "Amnour", "Amour", "Araria", "Arrah", "Arwal", "Asthawan", "Atri", "Aurai", "Aurangabad", "Babubarhi", "Bachhwara", "Bagaha", "Bahadurganj", "Bahadurpur", "Baikunthpur", "Baisi", "Bajpatti", "Bakhri (SC)", "Bakhtiarpur", "Balrampur", "Baniapur", "Banka", "Bankipur", "Banmankhi (SC)", "Barachatti", "Barari", "Barauli", "Barbigha", "Barh", "Barhara", "Barharia", "Baruraj", "Bathnaha (SC)", "Begusarai", "Belaganj", "Beldaur", "Belhar", "Belsand", "Benipatti", "Benipur", "Bettiah", "Bhabua", "Bhagalpur", "Bhorey (SC)", "Bibhutipur", "Bihariganj", "Biharsharif", "Bihpur", "Bikram", "Bisfi", "Bochaha (SC)", "Bodh Gaya (SC)", "Brahampur", "Buxar", "Chainpur", "Chakai", "Chanpatia", "Chapra", "Chenari (SC)", "Cheria Bariarpur", "Chhatapur", "Chiraia", "Danapur", "Darauli (SC)", "Daraundha", "Darbhanga", "Darbhanga Rural", "Dehri", "Dhaka", "Dhamdaha", "Dhauraiya (SC)", "Digha", "Dinara", "Dumraon", "Ekma", "Fatuha", "Forbesganj", "Gaighat", "Garkha (SC)", "Gaura Bauram", "Gaya Town", "Ghosi", "Gobindpur", "Goh", "Gopalganj", "Gopalpur", "Goriakothi", "Govindganj", "Gurua", "Hajipur", "Harlakhi", "Harnaut", "Harsidhi (SC)", "Hasanpur", "Hathua", "Hayaghat", "Hilsa", "Hisua", "Imamganj (SC)", "Islampur", "Jagdishpur", "Jale", "Jamalpur", "Jamui", "Jehanabad", "Jhajha", "Jhanjharpur", "Jokihat", "Kadwa", "Kahalgaon", "Kalyanpur", "Kalyanpur (SC)", "Kanti", "Karakat", "Kargahar", "Kasba", "Katihar", "Katoria (ST)", "Keoti", "Kesaria", "Khagaria", "Khajauli", "Kishanganj", "Kochadhaman", "Korha (SC)", "Kuchaikote", "Kumhrar", "Kurhani", "Kurtha", "Kusheshwar Asthan (SC)", "Kutumba (SC)", "Lakhisarai", "Lalganj", "Laukaha", "Lauriya", "Madhepura", "Madhuban", "Madhubani", "Maharajganj", "Mahishi", "Mahnar", "Mahua", "Makhdumpur (SC)", "Maner", "Manihari (ST)", "Manjhi", "Marhaura", "Masaurhi (SC)", "Matihani", "Minapur", "Mohania (SC)", "Mohiuddinnagar", "Mokama", "Morwa", "Motihari", "Munger", "Muzaffarpur", "Nabinagar", "Nalanda", "Narkatia", "Narkatiaganj", "Narpatganj", "Nathnagar", "Nautan", "Nawada", "Nirmali", "Nokha", "Obra", "Paliganj", "Parbatta", "Parihar", "Paroo", "Parsa", "Patepur (SC)", "Patna Sahib", "Phulparas", "Phulwari (SC)", "Pipra", "Pirpainti (SC)", "Pranpur", "Purnia", "Rafiganj", "Raghopur", "Raghunathpur", "Raja Pakar (SC)", "Rajauli (SC)", "Rajgir (SC)", "Rajnagar (SC)", "Rajpur (SC)", "Ramgarh", "Ramnagar (SC)", "Raniganj (SC)", "Raxaul", "Riga", "Rosera (SC)", "Runnisaidpur", "Rupauli", "Saharsa", "Sahebganj", "Sahebpur Kamal", "Sakra (SC)", "Samastipur", "Sandesh", "Sarairanjan", "Sasaram", "Shahpur", "Sheikhpura", "Sheohar", "Sherghati", "Sikandra (SC)", "Sikta", "Sikti", "Simri Bakhtiarpur", "Singheshwar (SC)", "Sitamarhi", "Siwan", "Sonbarsha (SC)", "Sonepur", "Sugauli", "Sultanganj", "Supaul", "Sursand", "Suryagarha", "Taraiya", "Tarapur", "Tarari", "Teghra", "Thakurganj", "Tikari", "Triveniganj (SC)", "Ujiarpur", "Vaishali", "Valmiki Nagar", "Warisnagar", "Warsaliganj", "Wazirganj", "Ziradei"],
        //     "S26_Chhattisgarh": ["Abhanpur", "Ahiwara (SC)", "Akaltara", "Ambikapur", "Antagarh (ST)", "Arang (SC)", "Baikunthpur", "Baloda Bazar", "Basna", "Bastar (ST)", "Beltara", "Bemetara", "Bhanupratappur (ST)", "Bharatpur-Sonhat (S", "Bhatapara", "Bhatgaon", "Bhilai Nagar", "Bijapur (ST)", "Bilaigarh (SC)", "Bilaspur", "Bilha", "Bindranawagarh (ST)", "Chandrapur", "Chitrakot", "Dantewada (ST)", "Dhamtari", "Dharamjaigarh", "Dharsiwa", "Dondi Lohara (ST)", "Dongargaon", "Dongargarh (SC)", "Durg City", "Durg-Rural", "Gunderdehi", "Jagdalpur", "Jaijaipur", "Janjgir-Champa", "Jashpur (ST)", "Kanker (ST)", "Kasdol", "Katghora", "Kawardha", "Keshkal (ST)", "Khairagarh", "Khallari", "Kharsia", "Khujji", "Kondagaon (ST)", "Konta (ST)", "Korba", "Kota", "Kunkuri (ST)", "Kurud", "Lailunga (ST)", "Lormi", "Lundra (ST)", "Mahasamund", "Manendragarh", "Marwahi (ST)", "Masturi (SC)", "Mohla-Manpur (ST)", "Mungeli (SC)", "Narayanpur (ST)", "Nawagarh (SC)", "Pali-Tanakhar (ST)", "Pamgarh (SC)", "Pandariya", "Patan", "Pathalgaon (ST)", "Pratappur (ST)", "Premnagar", "Raigarh", "Raipur City North", "Raipur City South", "Raipur City West", "Raipur Rural", "Rajim", "Rajnandgaon", "Ramanujganj (ST)", "Rampur (ST)", "Saja", "Sakti", "Samri (ST)", "Sanjari Balod", "Saraipali (SC)", "Sarangarh (SC)", "Sihawa (ST)", "Sitapur (ST)", "Takhatpur", "Vaishali Nagar"],
        //     "U05_Delhi": ["Adarsh Nagar", "Ambedkar Nagar(SC)", "Babarpur", "Badarpur", "Badli", "Ballimaran", "Bawana (SC)", "Bijwasan", "Burari", "Chandni Chowk", "Chhatarpur", "Delhi Cantt", "Deoli (SC)", "Dwarka", "Gandhi Nagar", "Ghonda", "Gokalpur (SC)", "Greater Kailash", "Hari Nagar", "Janakpuri", "Jangpura", "Kalkaji", "Karawal Nagar", "Karol Bagh (SC)", "Kasturba Nagar", "Kirari", "Kondli (SC)", "Krishna Nagar", "Laxmi Nagar", "Madipur (SC)", "Malviya Nagar", "Mangol Puri (SC)", "Matia Mahal", "Matiala", "Mehrauli", "Model Town", "Moti Nagar", "Mundka", "Mustafabad", "Najafgarh", "Nangloi Jat", "Nerela", "New Delhi", "Okhla", "Palam", "Patel Nagar (SC)", "Patparganj", "R.K. Puram", "Rajinder Nagar", "Rajouri Garden", "Rithala", "Rohini", "Rohtas Nagar", "Sadar Bazar", "Sangam Vihar", "Seelam Pur", "Seemapuri (SC)", "Shahdara", "Shakur Basti", "Shalimar Bagh", "Sultan Pur Majra(SC)", "Tilak Nagar", "Timarpur", "Tri Nagar", "Trilokpuri (SC)", "Tughlakabad", "Uttam Nagar", "Vikaspuri", "Vishwas Nagar", "Wazirpur"],
        //     "S05_Goa": ["Aldona", "Benaulim", "Bicholim", "Calangute", "Canacona", "Cortalim", "Cumbarjua", "Cuncolim", "Curchorem", "Curtorim", "Dabolim", "Fatorda", "Maem", "Mandrem", "Mapusa", "Marcaim", "Margao", "Mormugao", "Navelim", "Nuvem", "Panaji", "Pernem (SC)", "Ponda", "Poriem", "Porvorim", "Priol", "Quepem", "Saligao", "Sanguem", "Sanquelim", "Sanvordem", "Siolim", "Siroda", "St. Andre", "St. Cruz", "Taleigao", "Tivim", "Valpoi", "Vasco-Da-Gama", "Velim"],
        //     "S06_Gujarat": ["Abdasa", "Akota", "Amreli", "Anand", "Anjar", "Anklav", "Ankleshwar", "Balasinor", "Bardoli (SC)", "Bayad", "Becharaji", "Bharuch", "Bhavnagar East", "Bhavnagar Rural", "Bhavnagar West", "Bhiloda (ST)", "Bhuj", "Borsad", "Botad", "Chanasma", "Chhota Udaipur (ST", "Choryasi", "Chotila", "Dabhoi", "Dahegam", "Dahod (ST)", "Dangs", "Danta (ST)", "Dasada (SC)", "Daskroi", "Dediapada(ST)", "Deesa", "Deodar", "Devgadhbaria", "Dhandhuka", "Dhanera", "Dharampur", "Dhari", "Dholka", "Dhoraji", "Dhrangadhra", "Dwarka", "Ellisbridge", "Fatepura (ST)", "Gadhada (SC)", "Gandevi (ST)", "Gandhidham", "Gandhinagar(North)", "Gandhinagar(South)", "Garbada (ST)", "Gariadhar", "Ghatlodia", "Godhra", "Gondal", "Halol", "Himatnagar", "Idar (SC)", "Jalalpore", "Jambusar", "Jamjodhpur", "Jamnagar", "Jasdan", "Jetpur", "Jetpur (ST)", "Jhagadia (ST)", "Jhalod (ST)", "Junagadh", "Kadi (SC)", "Kalavad (SC)", "Kalol", "Kamrej", "Kankrej", "Kapadvanj", "Kaprada (ST)", "Karjan", "Keshod", "Khambhalia", "Khambhat", "Khedbrahma(ST)", "Kheralu", "Kodinar (SC)", "Kutiyana", "Lathi", "Limbdi", "Limkheda (ST)", "Lunawada", "Mahesana", "Mahudha", "Mahuva", "Mahuva (ST)", "Manavadar", "Mandvi", "Mandvi (ST)", "Mangrol", "Mangrol (ST)", "Manjalpur", "Mansa", "Matar", "Mehmedabad", "Modasa", "Morbi", "Morva Hadaf", "Nadiad", "Nandod (ST)", "Navsari", "Nizar (ST)", "Olpad", "Padra", "Palanpur", "Palitana", "Pardi", "Patan", "Petlad", "Porbandar", "Prantij", "Radhanpur", "Rajkot East", "Rajkot Rural(SC)", "Rajkot South", "Rajkot West", "Rajula", "Raopura", "Rapar", "Sanand", "Sankheda(ST)", "Santrampur", "Savarkundla", "Savli", "Sayajigunj", "Shehra", "Sidhpur", "Sojitra", "Somnath", "Surat", "Talaja", "Talala", "Tankara", "Tharad", "Thasra", "Umbergaon", "Umreth", "Una", "Unjha", "Vadgam (SC)", "Vadodara City(SC)", "Vaghodia", "Vagra", "Valsad", "Vansda (ST)", "Vatva", "Vav", "Vejalpur", "Vijapur", "Viramgam", "Visavadar", "Visnagar", "Vyara (ST)", "Wadhwan", "Wankaner"],
        //     "S07_Haryana": ["Adampur", "Ambala Cantt.", "Ambala City", "Assandh", "Ateli", "Badhra", "Badkhal", "Badli", "Badshahpur", "Bahadurgarh", "Ballabhgarh", "Baroda", "Barwala", "Bawal (SC)", "Bawani Khera (SC)", "Beri", "Bhiwani", "Dabwali", "Dadri", "Ellenabad", "Faridabad", "Faridabad NIT", "Fatehabad", "Ferozepur Jhirka", "Ganaur", "Garhi Sampla-Kilo", "Gharaunda", "Gohana", "Guhla (SC)", "Gurgaon", "Hansi", "Hathin", "Hisar", "Hodal (SC)", "Indri", "Israna (SC)", "Jagadhri", "Jhajjar (SC)", "Jind", "Julana", "Kaithal", "Kalanaur (SC)", "Kalanwali (SC)", "Kalayat", "Kalka", "Karnal", "Kharkhauda (SC)", "Kosli", "Ladwa", "Loharu", "Mahendragarh", "Meham", "Mulana (SC)", "Nalwa", "Nangal Chaudhry", "Naraingarh", "Narnaul", "Narnaund", "Narwana (SC)", "Nilokheri(SC)", "Nuh", "Palwal", "Panchkula", "Panipat City", "Panipat Rural", "Pataudi (SC)", "Pehowa", "Prithla", "Punahana", "Pundri", "Radaur", "Rai", "Rania", "Ratia (SC)", "Rewari", "Rohtak", "Sadhaura (SC)", "Safidon", "Samalkha", "Shahbad (SC)", "Sirsa", "Sohna", "Sonipat", "Thanesar", "Tigaon", "Tohana", "Tosham", "Uchana Kalan", "Uklana (SC)", "Yamunanagar"],
        //     "S08_Himachal Pradesh": ["Anni (SC)", "Arki", "Baijnath (SC)", "Balh (SC)", "Banjar", "Barsar", "Bharmour (ST)", "Bhattiyat", "Bhoranj (SC)", "Bilaspur", "Chamba", "Chintpurni (SC)", "Chopal", "Churah (SC)", "Dalhousie", "Darang", "Dehra", "Dharampur", "Dharamshala", "Doon", "Fatehpur", "Gagret", "Ghumarwin", "Hamirpur(HP)", "Haroli", "Indora (SC)", "Jaisinghpur (SC)", "Jaswan-Pragpur", "Jawalamukhi", "Jawali", "Jhanduta (SC)", "Jogindernagar", "Jubbal-Kotkhai", "Kangra", "Karsog (SC)", "Kasauli (SC)", "Kasumpti", "Kinnaur (ST)", "Kullu", "Kutlehar", "Lahaul & Spiti (ST)", "Manali", "Mandi", "Nachan (SC)", "Nadaun", "Nagrota", "Nahan", "Nalagarh", "Nurpur", "Pachhad (SC)", "Palampur", "Paonta Sahib", "Rampur (SC)", "Rohru (SC)", "Sarkaghat", "Seraj", "Shahpur", "Shillai", "Shimla", "Shimla Rural", "Solan (SC)", "Sri Naina Deviji", "Sri Renukaji (SC", "Sujanpur", "Sullah", "Sundernagar", "Theog", "Una"],
        //     "S09_Jammu and Kashmir": ["AKHNOOR", "AMIRA KADA", "ANANTNAG", "BADGAM", "BANDIPORA", "BANI", "BANIHAL", "BARAMULA", "BASOHLI", "BATAMALOO", "BEERWAH", "BHADERWAH", "BIJBEHARA", "BILLAWAR", "BISHNAH", "CHADOORA", "CHENANI", "CHHAMB", "CHRAR SHAR", "DARHAL", "DEVSAR", "DODA", "DORU", "EIDGAH", "GANDERBAL", "GANDHI NAGAR", "GOOL-ARNAS", "GULABGARH", "GULMARG", "GUREZ", "HABBA KADA", "HANDWARA", "HAZRATBAL", "HIRA NAGAR", "HOM SHALI", "INDERWAL", "JAMMU EAST", "JAMMU WEST", "JK_1", "JK_2", "KALA KOTE", "KANGAN", "KARGIL", "KARNAH", "KATHUA", "KHAN SAHEB", "KHANIYAR", "KISHTWAR", "KOKERNAG", "KULGAM", "KUPWARA", "LANGATE", "LEH", "LOLAB", "MARH", "MENDHAR", "NAGROTA", "NAUSHEHRA", "NOORABAD", "NURBRA", "PAHALGAM", "PAMPORE", "PATTAN", "POONCH HAVELI", "PULWAMA", "RAFIABAD", "RAIPUR DOMANA", "RAJAURI", "RAJPORA", "RAM NAGAR", "RAMBAN", "RANBIR SINGH PURA", "REASI", "SAMBA", "SANGRAMA", "SHANGUS", "SHOPIAN", "SONAWAR", "SONAWARI", "SOPORE", "SUCHET GARH", "SURAN KOTE", "TRAL", "UDHAMPUR", "URI", "VIJAYPUR", "WACHI", "ZADIBAL", "ZANSKAR"],
        //     "S27_Jharkhand": ["BAGHMARA", "BAGODAR", "BAHARAGORA", "BARHAIT (ST)", "BARHI", "BARKAGAON", "BARKATHA", "BERMO", "BHAWANATHPUR", "BISHNUPUR (ST)", "BISHRAMPUR", "BOKARO", "BORIO (ST)", "CHAIBASA (ST)", "CHAKRADHARPUR (ST)", "CHANDANKIYARI (SC)", "CHATRA (SC)", "CHHATARPUR (SC)", "DALTONGANJ", "DEOGHAR (SC)", "DHANBAD", "DHANWAR", "DUMKA (ST)", "DUMRI", "GANDEY", "GARHWA", "GHATSILA (ST)", "GIRIDIH", "GODDA", "GOMIA", "GUMLA (ST)", "HATIA", "HAZARIBAGH", "HUSSAINABAD", "ICHAGARH", "JAGANATHPUR (ST)", "JAMA (ST)", "JAMSHEDPUR EAST", "JAMSHEDPUR WEST", "JAMTARA", "JAMUA (SC)", "JARMUNDI", "JHARIA", "JUGSALAI (SC)", "KANKE (SC)", "KHARASAWAN (ST)", "KHIJRI (ST)", "KHUNTI (ST)", "KODARMA", "KOLEBIRA (ST)", "LATEHAR (SC)", "LITIPARA (ST)", "LOHARDAGA (ST)", "MADHUPUR", "MAHAGAMA", "MAHESHPUR (ST)", "MAJHGAON (ST)", "MANDAR (ST)", "MANDU", "MANIKA (ST)", "MANOHARPUR (ST)", "NALA", "NIRSA", "PAKAUR", "PANKI", "POREYAHAT", "POTKA (ST)", "RAJMAHAL", "RAMGARH", "RANCHI", "SARATH", "SERAIKELLA (ST)", "SIKARIPARA (ST)", "SILLI", "SIMARIA (SC)", "SIMDEGA (ST)", "SINDRI", "SISAI (ST)", "TAMAR (ST)", "TORPA (ST)", "TUNDI"],
        //     "S10_Karnataka": ["Afzalpur", "Aland", "Anekal (SC)", "Arabhavi", "Arkalgud", "Arsikere", "Athani", "Aurad", "B.T.M Layout", "Babaleshwar", "Badami", "Bagalkot", "Bagepalli", "Bailhongal", "Bangalore South", "Bangarapet (SC)", "Bantval", "Basavakalyan", "Basavana Bagevadi", "Basavanagudi", "Belgaum Dakshin", "Belgaum Rural", "Belgaum Uttar", "Bellary (ST)", "Bellary City", "Belthangady", "Belur", "Bhadravati", "Bhalki", "Bhatkal", "Bidar", "Bidar South", "Bijapur City", "Bilgi", "Bommanahalli", "Byadgi", "Byatarayanapura", "Byndoor", "C.V. Raman Nagar(SC)", "Challakere (ST)", "Chamaraja", "Chamarajanagar", "Chamrajpet", "Chamundeshwari", "Channagiri", "Channapatna", "Chickpet", "Chikkaballapur", "Chikkodi-Sadalga", "Chikmagalur", "Chiknayakanhalli", "Chincholi", "Chintamani", "Chitradurga", "Chittapur (SC)", "Dasarahalli", "Davanagere North", "Davanagere South", "Devadurga (ST)", "Devanahalli (SC)", "Devar Hippargi", "Dharwad", "Doddaballapur", "Gadag", "Gandhi Nagar", "Gangawati", "Gauribidanur", "Gokak", "Govindraj Nagar", "Gubbi", "Gulbarga Dakshin", "Gulbarga Rural", "Gulbarga Uttar", "Gundlupet", "Gurmitkal", "Hadagalli (SC)", "Hagaribommanahalli(SC)", "Haliyal", "Hangal", "Hanur", "Harapanahalli", "Harihar", "Hassan", "Haveri (SC)", "Hebbal", "Heggadadevankote(ST)", "Hirekerur", "Hiriyur", "Holalkere (SC)", "Holenarasipur", "Homnabad", "Honnali", "Hosadurga", "Hosakote", "Hubli-Dharwad-Central", "Hubli-Dharwad-East(SC)", "Hubli-Dharwad-West", "Hukkeri", "Hungund", "Hunsur", "Indi", "Jagalur (ST)", "Jamkhandi", "Jayanagar", "Jevargi", "K.R.Pura", "Kadur", "Kagwad", "Kalghatgi", "Kampli (ST)", "Kanakagiri (SC)", "Kanakapura", "Kapu", "Karkal", "Karwar", "Khanapur", "Kittur", "Kolar", "Kolar Gold Field(SC)", "Kollegal (SC)", "Koppal", "Koratagere (SC)", "Krishnaraja", "Krishnarajanagara", "Krishnarajpet", "Kudachi (SC)", "Kudligi (ST)", "Kumta", "Kundapura", "Kundgol", "Kunigal", "Kushtagi", "Lingsugur (SC)", "Maddur", "Madhugiri", "Madikeri", "Magadi", "Mahadevapura", "Mahalakshmi Layout", "Malavalli (SC)", "Malleshwaram", "Malur", "Mandya", "Mangalore", "Mangalore City North", "Mangalore City South", "Manvi (ST)", "Maski (ST)", "Mayakonda (SC)", "Melukote", "Molakalmuru (ST)", "Moodabidri", "Muddebihal", "Mudhol (SC)", "Mudigere (SC)", "Mulbagal (SC)", "Nagamangala", "Nagthan", "Nanjangud (SC)", "Narasimharaja", "Nargund", "Navalgund", "Nelamangala (SC)", "Nippani", "Padmanaba Nagar", "Pavagada (SC)", "Piriyapatna", "Pulakeshinagar(SC)", "Puttur", "Raichur", "Raichur Rural (ST)", "Rajaji Nagar", "Rajarajeshwarinagar", "Ramanagaram", "Ramdurg", "Ranibennur", "Raybag (SC)", "Ron", "Sagar", "Sakleshpur (SC)", "Sandur (ST)", "Sarvagnanagar", "Saundatti Yellamma", "Sedam", "Shahapur", "Shanti Nagar", "Shiggaon", "Shikaripura", "Shimoga", "Shimoga Rural (SC)", "Shirahatti (SC)", "Shivajinagar", "Shorapur (ST)", "Shravanabelagola", "Shrirangapattana", "Sidlaghatta", "Sindgi", "Sindhanur", "Sira", "Sirsi", "Siruguppa (ST)", "Sorab", "Sringeri", "Srinivaspur", "Sullia (SC)", "T.Narasipur (SC)", "Tarikere", "Terdal", "Tiptur", "Tirthahalli", "Tumkur City", "Tumkur Rural", "Turuvekere", "Udupi", "Varuna", "Vijay Nagar", "Vijayanagara", "Virajpet", "Yadgir", "Yelahanka", "Yelburga", "Yellapur", "Yemkanmardi (ST)", "Yeshvanthapura"],
        //     "S11_Kerala": ["Adoor (SC)", "Alappuzha", "Alathur", "Aluva", "Ambalappuzha", "Angamaly", "Aranmula", "Aroor", "Aruvikkara", "Attingal (SC)", "Azhikode", "Balusseri (SC)", "Beypore", "Chadayamangalam", "Chalakudy", "Changanassery", "Chathannoor", "Chavara", "Chelakkara (SC)", "Chengannur", "Cherthala", "Chirayinkeezhu", "Chittur", "Devikulam (SC)", "Dharmadam", "Elathur", "Eravipuram", "Ernad", "Ernakulam", "Ettumanoor", "Guruvayoor", "Haripad", "Idukki", "Irikkur", "Irinjalakuda", "Kaduthuruthy", "Kaipamangalam", "Kalamassery", "Kalliasseri", "Kalpetta", "Kanhangad", "Kanjirappally", "Kannur", "Karunagappally", "Kasaragod", "Kattakkada", "Kayamkulam", "Kazhakoottam", "Kochi", "Kodungallur", "Koduvally", "Kollam", "Kondotty", "Kongad(SC)", "Konni", "Kothamangalam", "Kottakkal", "Kottarakkara", "Kottayam", "Kovalam", "Kozhikode North", "Kozhikode South", "Kundara", "Kunnamangalam", "Kunnamkulam", "Kunnathunad (SC)", "Kunnathur (SC)", "Kuthuparamba", "Kuttanad", "Kuttiadi", "Ma njeshwar", "Malampuzha", "Malappuram", "Manalur", "Mananthavady (ST)", "Manjeri", "Mankada", "Mannarkkad", "Mattannur", "Mavelikkara (SC)", "Muvattupuzha", "Nadapuram", "Nattika(SC)", "Nedumangad", "Nemmara", "Nemom", "Neyyattinkara", "Nilambur", "Ollur", "Ottappalam", "Pala", "Palakkad", "Parassala", "Paravur", "Pathanapuram", "Pattambi", "Payyannur", "Peerumade", "Perambra", "Peravoor", "Perinthalmanna", "Perumbavoor", "Piravom", "Ponnani", "Poonjar", "Punalur", "Puthukkad", "Puthuppally", "Quilandy", "Ranni", "Shornur", "Sulthanbathery (S", "Taliparamba", "Tanur", "Tarur (SC)", "Thalassery", "Thavanur", "Thiruvalla", "Thiruvambadi", "Thiruvananthapura", "Thodupuzha", "Thrikkakara", "Thripunithura", "Thrissur", "Thrithala", "Tirur", "Tirurangadi", "Trikaripur", "Udma", "Udumbanchola", "Vadakara", "Vaikom (SC)", "Vallikunnu", "Vamanapuram", "Varkala", "Vattiyoorkavu(SC)", "Vengara", "Vypeen", "Wadakkanchery", "Wandoor (SC)"],
        //     "S12_Madhya Pradesh": ["Agar (SC)", "Alirajpur (ST)", "Alot (SC)", "Amarpatan", "Amarwara (ST)", "Ambah (SC)", "Amla (SC)", "Anuppur (ST)", "Ashok Nagar (SC)", "Ashta (SC)", "Ater", "Badnagar", "Badnawar", "Badwah", "Badwani (ST)", "Bagali (ST)", "Bahoriband", "Baihar (ST)", "Balaghat", "Bamori", "Banda", "Bandhavgarh (ST)", "Barghat (ST)", "Bargi", "Barwara (ST)", "Basoda", "Beohari (ST)", "Berasia (SC)", "Betul", "Bhagwanpura(ST)", "Bhainsdehi (ST)", "Bhander (SC)", "Bhikangaon (ST)", "Bhind", "Bhitarwar", "Bhojpur", "Bhopal Dakshin-Paschim", "Bhopal Madhya", "Bhopal Uttar", "Biaora", "Bichhiya (ST)", "Bijawar", "Bina (SC)", "Budhni", "Burhanpur", "Chachoura", "Chanderi", "Chandla (SC)", "Chhatarpur", "Chhindwara", "Chitrakoot", "Chitrangi (ST)", "Churai", "Churhat", "Dabra (SC)", "Damoh", "Datia", "Deori", "Deotalab", "Depalpur", "Devsar (SC)", "Dewas", "Dhar", "Dharampuri (ST)", "Dhauhani (ST)", "Dimani", "Dindori (ST)", "Dr. Ambedkar Nagar-Mhow", "Gadarwara", "Gandhwani (ST)", "Garoth", "Ghatiya (SC)", "Ghoradongri (ST)", "Gohad (SC)", "Gotegaon (SC)", "Govindpura", "Guna (SC)", "Gunnaor (SC)", "Gurh", "Gwalior", "Gwalior East", "Gwalior Rural", "Gwalior South", "Harda", "Harsud (ST)", "Hatpipliya", "Hatta (SC)", "Hoshangabad", "Huzur", "Ichhawar", "Indore", "Jabalpur Cantt.", "Jabalpur Paschim", "Jabalpur Purba(SC)", "Jabalpur Uttar", "Jabera", "Jaisinghnagar (ST)", "Jaitpur (ST)", "Jaora", "Jatara (SC)", "Jawad", "Jhabua (ST)", "Jobat (ST)", "Joura", "Junnardeo (ST)", "Kalapipal", "Karera (SC)", "Kasrawad", "Katangi", "Keolari", "Khandwa (SC)", "Khargapur", "Khargone", "Khategaon", "Khilchipur", "Khurai", "Kolaras", "Kotma", "Kukshi (ST)", "Kurwai (SC)", "Lahar", "Lakhnadon(ST)", "Lanji", "Maharajpur", "Maheshwar (SC)", "Mahidpur", "Maihar", "Malhara", "Malhargarh (SC)", "Manasa", "Manawar (ST)", "Mandhata", "Mandla (ST)", "Mandsour", "Mangawan (SC)", "Manpur (ST)", "Mauganj", "Mehgaon", "Morena", "Multai", "Mungaoli", "Murwara", "Nagada-Khachrod", "Nagod", "Narela", "Narsinghgarh", "Narsingpur", "Naryoli (SC)", "Neemuch", "Nepanagar (ST)", "Niwari", "Niwas (ST)", "Panagar", "Pandhana (ST)", "Pandhurna (ST)", "Panna", "Pansemal (ST)", "Parasia (SC)", "Paraswada", "Patan", "Pathariya", "Pawai", "Petlawad (ST)", "Pichhore", "Pipariya (SC)", "Pohari", "Prithvipur", "Pushprajgarh (ST)", "Raghogarh", "Raigaon (SC)", "Rajgarh", "Rajnagar", "Rajpur (ST)", "Rampur-Baghelan", "Ratlam City", "Ratlam Rural (ST)", "Rau", "Rehli", "Rewa", "Sabalgarh", "Sagar", "Sailana (ST)", "Sanchi (SC)", "Sanwer (SC)", "Sarangpur (SC)", "Sardarpur (ST)", "Satna", "Saunsar", "Sehore", "Semariya", "Sendhawa (ST)", "Seoni", "Seoni-Malwa", "Sewda", "Shahpura (ST)", "Shajapur", "Shamshabad", "Sheopur", "Shivpuri", "Shujalpur", "Sidhi", "Sihawal", "Sihora (ST)", "Silwani", "Singrauli", "Sirmour", "Sironj", "Sohagpur", "Sonkatch (SC)", "Sumawali", "Surkhi", "Susner", "Suwasra", "Tarana (SC)", "Tendukheda", "Teonthar", "Thandla (ST)", "Tikamgarh", "Timarni (ST)", "Udaipura", "Ujjain Dakshin", "Ujjain Uttar", "Vidisha", "Vijaypur", "Vijayraghavgarh", "Waraseoni"],
        //     "S13_Maharashtra": ["Achalpur", "Aheri (ST)", "Ahmadpur", "Ahmednagar", "Airoli", "Akkalkot", "Akkalkuwa (ST)", "Akola East", "Akola West", "Akole (ST)", "Akot", "Alibag", "Amalner", "Ambegaon", "Ambernath (SC)", "Amgaon (ST)", "Amravati", "Andheri East", "Andheri West", "Anushakti Nagar", "Arjuni Morgaon(SC)", "Armori (ST)", "Arni (ST)", "Arvi", "Ashti", "Aurangabad Central", "Aurangabad East", "AurangabadWest(SC)", "Ausa", "Badnapur (SC)", "Badnera", "Baglan (ST)", "Balapur", "Ballarpur", "Baramati", "Barshi", "Basmath", "Beed", "Belapur", "Bhandara (SC)", "Bhandup West", "Bhiwandi East", "Bhiwandi Rural(ST)", "Bhiwandi West", "Bhokar", "Bhokardan", "Bhor", "Bhosari", "Bhusawal (SC)", "Boisar (ST)", "Borivali", "Brahmapuri", "Buldhana", "Byculla", "Chalisgaon", "Chandgad", "Chandivali", "Chandrapur (SC)", "Chandvad", "Charkop", "Chembur", "Chikhli", "Chimur", "Chinchwad", "Chiplun", "Chopda (ST)", "Colaba", "Dahanu", "Dahisar", "Dapoli", "Daryapur (SC)", "Daund", "Deglur (SC)", "Deolali (SC)", "Deoli", "Dhamangaon Railway", "Dharavi (SC)", "Dhule City", "Dhule Rural", "Digras", "Dindori (ST)", "Dindoshi", "Dombivali", "Erandol", "Gadchiroli (ST)", "Gangakhed", "Gangapur", "Georai", "Ghansawangi", "Ghatkopar East", "Ghatkopar West", "Gondiya", "Goregaon", "Guhagar", "Hadapsar", "Hadgaon", "Hatkanangle(SC)", "Hinganghat", "Hingna", "Hingoli", "Ichalkaranji", "Igatpuri (ST)", "Indapur", "Islampur", "Jalgaon (Jamod)", "Jalgaon City", "Jalgaon Rural", "Jalna", "Jamner", "Jat", "Jintur", "Jogeshwari East", "Junnar", "Kagal", "Kaij (SC)", "Kalamnuri", "Kalina", "Kalwan (ST)", "Kalyan East", "Kalyan Rural", "Kalyan West", "Kamthi", "Kandivali East", "Kankavli", "Kannad", "Karad North", "Karad South", "Karanja", "Karjat", "Karjat Jamkhed", "Karmala", "Karvir", "Kasba Peth", "Katol", "Khadakwasala", "Khamgaon", "Khanapur", "Khed Alandi", "Kinwat", "Kolhapur North", "Kolhapur South", "Kopargaon", "Kopri-Pachpakhadi", "Koregaon", "Kothrud", "Kudal", "Kurla (SC)", "Latur City", "Latur Rural", "Loha", "Madha", "Magathane", "Mahad", "Mahim", "Majalgaon", "Malabar Hill", "Malad West", "Malegaon Central", "Malegaon Outer", "Malkapur", "Malshiras (SC)", "Man", "Mankhurd Shivaji Nagar", "Maval", "Mehkar (SC)", "Melghat (ST)", "Mira Bhayandar", "Miraj (SC)", "Mohol (SC)", "Morshi", "Mukhed", "Muktainagar", "Mulund", "Mumbadevi", "Mumbra-Kalwa", "Murbad", "Murtizapur (SC)", "Nagpur Central", "Nagpur East", "Nagpur North", "Nagpur South", "Nagpur South West", "Nagpur West", "Naigaon", "Nalasopara", "Nanded North", "Nanded South", "Nandgaon", "Nandurbar (ST)", "Nashik Central", "Nashik East", "Nashik West", "Nawapur (ST)", "Nevasa", "Nilanga", "Niphad", "Osmanabad", "Ovala ?Majiwada", "Pachora", "Paithan", "Palghar (ST)", "Palus-Kadegaon", "Pandharpur", "Panvel", "Paranda", "Parbhani", "Parli", "Parner", "Partur", "Parvati", "Patan", "Pathri", "Pen", "Phaltan (SC)", "Phulambri", "Pimpri (SC)", "Pune Cantonment (SC)", "Purandar", "Pusad", "Radhanagari", "Rahuri", "Rajapur", "Rajura", "Ralegaon (ST)", "Ramtek", "Ratnagiri", "Raver", "Risod", "Sakoli", "Sakri (ST)", "Sangamner", "Sangli", "Sangole", "Satara", "Savner", "Sawantwadi", "Shahada (ST)", "Shahapur (ST)", "Shahuwadi", "Shevgaon", "Shirala", "Shirdi", "Shirol", "Shirpur (ST)", "Shirur", "Shivadi", "Shivajinagar", "Shrigonda", "Shrirampur(SC)", "Shrivardhan", "Sillod", "Sindkhed Raja", "Sindkheda", "Sinnar", "Sion Koliwada", "Solapur City Central", "Solapur City North", "Solapur South", "Tasgaon-Kavathe Mahankal", "Teosa", "Thane", "Tirora", "Tuljapur", "Tumsar", "Udgir (SC)", "Ulhasnagar", "Umarga (SC)", "Umarkhed (SC)", "Umred (SC)", "Uran", "Vadgaon Sheri", "Vaijapur", "Vandre East", "Vandre West", "Vasai", "Versova", "Vikhroli", "Vikramgad (ST)", "Vile Parle", "Wadala", "Wai", "Wani", "Wardha", "Warora", "Washim (SC)", "Worli", "Yavatmal", "Yevla"],
        //     "S14_Manipur": ["Andro", "Bishenpur", "Chandel", "Chingai", "Churachandpur", "Heingang", "Heirok", "Henglep", "Hiyanglam", "Jiribam", "Kakching", "Kangpokpi", "Karong", "Keirao", "Keisamthong", "Khangabo", "Khetrigao", "Khundrakpam", "Khurai", "Konthoujam", "Kumbi", "Lamlai", "Lamsang", "Lilong", "Mao", "Mayang Imphal", "Moirang", "Nambol", "Naoriya Pakhanglak*", "Nungba", "Oinam", "Patsoi", "Phungyar", "Sagolband", "Saikot", "Saikul", "Saitu", "Sekmai", "Singhat", "Singjamei", "Sugnoo", "Tadubi", "Tamei", "Tamenglong", "Tengnoupal", "Thanga", "Thangmeiband", "Thanlon", "Thongju", "Thoubal", "Tipaimukh", "Ukhrul", "Uripok", "Wabgai", "Wangjing Tentha", "Wangkhei", "Wangkhem", "Wangoi", "Yaiskul", "langthabal"],
        //     "S15_Meghalaya": ["Amlarem (ST)", "Ampathi (ST)", "Baghmara (ST)", "Bajengdoba (ST)", "Chokpot (ST)", "Dadenggre (ST)", "Dalu (ST)", "East Shillong (ST)", "Gambegre (ST)", "Jirang (ST)", "Jowai (ST)", "Kharkutta (ST)", "Khliehriat (ST)", "Mahendraganj (ST)", "Mairang (ST)", "Mawhati (ST)", "Mawkynrew (ST)", "Mawkyrwat (ST)", "Mawlai (ST)", "Mawphlang (ST)", "Mawryngkneng(ST)", "Mawshynrut (ST)", "Mawsynram (ST)", "Mawthadraishan (ST)", "Mendipathar (ST)", "Mowkaiaw (ST)", "Mylliem (ST)", "Nartiang (ST)", "Nongkrem (ST)", "Nongpoh (ST)", "Nongstoin (ST)", "Nongthymmai (ST)", "North Shillong (ST)", "North Tura (ST)", "Phulbari", "Pynthorumkhrah", "Pynursla (ST)", "Rajabala", "Raksamgre (ST)", "Raliang (ST)", "Rambrai Jyrngam (ST", "Rangsakona (ST)", "Ranikor (ST)", "Resubelpara (ST)", "Rongara-Siju (ST)", "Rongjeng (ST)", "Salmanpara (ST)", "Selsella", "Shella (ST)", "Sohing (ST)", "Sohra (ST)", "Songsak (ST)", "South Shillong", "SouthTura (ST)", "Sutnga-Saipung (ST)", "Tikrikila (ST)", "Umroi (ST)", "Umsning (ST)", "West Shillong", "William Nagar (ST)"],
        //     "S16_Mizoram": ["Aizawl East-I", "Aizawl East-II (ST)", "Aizawl North-I (ST)", "Aizawl North-II (ST", "Aizawl North-III (S", "Aizawl South-I (ST)", "Aizawl South-II (ST", "Aizawl South-III (S", "Aizawl West-I (ST)", "Aizawl West-II (ST)", "Aizawl West-III (ST", "Chalfilh (ST)", "Champhai North (ST)", "Champhai South (ST)", "Dampa (ST)", "East Tuipui (ST)", "Hachhek (ST)", "Hrangturzo (ST)", "Kolasib (ST)", "Lawngtlai East (ST)", "Lawngtlai West (ST)", "Lengteng (ST)", "Lunglei East (ST)", "Lunglei North (ST)", "Lunglei South (ST)", "Lunglei West (ST)", "Mamit (ST)", "Palak (ST)", "Saiha (ST)", "Serchhip (ST)", "Serlui (ST)", "South Tuipui (ST)", "Tawi (ST)", "Thorang (ST)", "Tuichang (ST)", "Tuichawng (ST)", "Tuikum (ST)", "Tuirial (ST)", "Tuivawl (ST)", "West Tuipui (ST)"],
        //     "S17_Nagaland": ["Aboi", "Aghunato", "Akuluto", "Alungtaki", "Angetyongpang", "Aonglenden", "Arkakong", "Atoizu", "Bhandari", "Chazouba", "Chizami", "Dimapur-I", "Dimapur-II", "Dimapur-III", "Ghaspani-I", "Ghaspani-II", "Impur", "Jangpetkong", "Kohima Town", "Koridang", "Longkhim Chare", "Longleng", "Meluri", "Moka", "Mokokchung Town", "Mon Town", "Monguya", "Noklak", "Noksen", "Northern Angami - I", "Northern Angami-II", "Peren", "Pfutsero", "Phek", "Phomching", "Pughoboto", "Pungro-Kiphire", "Sanis", "Satakha", "Shamtorr-Chessore", "Siyuchong-Sitimi", "Southern Angami-I", "Southern Angami-II", "Suruhuto", "Tamlu", "Tapi", "Tehok", "Tenning", "Thonoknyu", "Tizit", "Tobu", "Tseminyu", "Tuensang Sadar-I", "Tuensang Sadar-II", "Tuli", "Tyui", "Wakching", "Western Angami", "Wokha", "Zunheboto"],
        //     "S18_Odisha": ["ANGUL", "ATHAGARH", "ATHAMALLIK", "ATTABIRA (SC)", "AUL", "Anand", "Aska", "BADASAHI (SC)", "BALASORE", "BALIGUDA (ST)", "BALIKUDA-ERASAMA", "BANGRIPOSI (ST)", "BANKI", "BARABATI-CUTTACK", "BARACHANA", "BARAMBA", "BARGARH", "BARI", "BARIPADA (ST)", "BASTA", "BASUDEVPUR", "BEGUNIA", "BERHAMPUR", "BHADRAK", "BHANDARIPOKHARI", "BHANJANAGAR", "BHATLI", "BHAWANIPATNA (SC)", "BHOGRAI", "BHUBANESWAR(MADHYA)", "BHUBANESWAR(UTTAR)", "BIJEPUR", "BINJHARPUR (SC)", "BIRAMITRAPUR (ST)", "BIRMAHARAJPUR (SC)", "BISSAM CUTTACK (ST)", "BOLANGIR", "BONAI (ST)", "BOUDH", "BRAHMAGIRI", "BRAJARAJNAGAR", "CHAMPUA", "CHANDABALI", "CHHATRAPUR (SC)", "CHHENDIPADA (SC)", "CHIKITI", "CHILIKA", "CHITRAKONDA (ST)", "CHOUDWAR-CUTTACK", "CUTTACK SADAR (SC)", "DABUGAM (ST)", "DASPALLA (SC)", "DEOGARH", "DHAMNAGAR (SC)", "DHARMASALA", "DHARMGARH", "DHENKANAL", "DIGAPAHANDI", "EKAMRA-BHUBANESHWAR", "G. UDAYAGIRI (ST)", "GHASIPURA", "GOPALPUR", "GUNUPUR (ST)", "HINDOL (SC)", "Hinjali", "JAGATSINGHPUR", "JAJPUR", "JALESWAR", "JASHIPUR (ST)", "JATANI", "JAYADEV (SC)", "JEYPORE", "JHARIGAM (ST)", "JHARSUGUDA", "JUNAGARH", "KABISURYANAGAR", "KAKATPUR (SC)", "KAMAKHYANAGAR", "KANTABANJI", "KANTAMAL", "KARANJIA (ST)", "KENDRAPARA (SC)", "KEONJHAR (ST)", "KHALIKOTE (SC)", "KHANDAPADA", "KHARIAR", "KHURDA", "KORAPUT (SC)", "KOREI", "KOTPAD (ST)", "KUCHINDA (ST)", "LAKSHMIPUR (ST)", "LANJIGARH (ST)", "LOISINGHA (SC)", "MAHAKALAPADA", "MAHANGA", "MALKANGIRI (ST)", "MOHANA (ST)", "MORADA", "NABARANGPUR (ST)", "NARLA", "NAYAGARH", "NIALI (SC)", "NILGIRI", "NIMAPARA", "NUAPADA", "PADAMPUR", "PALLAHARA", "PARADEEP", "PARALAKHEMUNDI", "PARJANGA", "PATKURA", "PATNA (ST)", "PATNAGARH", "PHULBANI (ST)", "PIPILI", "POLASARA", "POTTANGI (ST)", "Puri", "RAGHUNATHPALI (SC)", "RAIRAKHOL", "RAIRANGPUR (ST)", "RAJANAGAR", "RAJGANGPUR (ST)", "RANPUR", "RAYAGADA (ST)", "REMUNA (SC)", "RENGALI (SC)", "ROURKELA", "SALIPUR", "SAMBALPUR", "SANAKHEMUNDI", "SARASKANA (ST)", "SATYABADI", "SIMULIA", "SONEPUR", "SORO (SC)", "SUKINDA", "SUNDARGARH (ST)", "SURADA", "TALCHER", "TALSARA (ST)", "TELKOI (ST)", "TIRTOL (SC)", "TITLAGARH", "UDALA (ST)", "UMERKOTE (ST)"],
        //     "U07_Puducherry": ["Ariankuppam", "Bahour", "Embalam", "Indira Nagar", "Kadirgamam", "Kalapet", "Kamraj Nagar", "Karaikal North", "Karaikal South", "Lawspet", "Mahe", "Manavely", "Mangalam", "Mannadipet", "Mudaliarpet", "Muthialpet", "Nedungadu (SC)", "Nellithope", "Neravy- T.R. Pattin", "Nettapakkam", "Orleampeth", "Oupalam", "Oussudu", "Ozhukarai", "Raj Bhavan", "Thattanchavady", "Thirubhuvanai", "Thirunallar", "Villianur", "Yanam"],
        //     "S19_Punjab": ["Abohar", "Adampur (SC)", "Ajnala", "Amargarh", "Amloh", "Amritsar Central", "Amritsar East", "Amritsar North", "Amritsar South", "Amritsar West (SC)", "Anand", "Atam Nagar", "Attari (SC)", "Baba Bakala (SC)", "Balachaur", "Balluana (SC)", "Banga (SC)", "Barnala", "Bassi Pathana (SC)", "Batala", "Bathinda Rural (SC)", "Bathinda Urban", "Bhadaur", "Bhagha Purana", "Bhoa (SC)", "Bholath", "Bhucho Mandi (SC)", "Budhlada (SC)", "Chabbewal (SC)", "Chamkaur Sahib (SC)", "Dakha", "Dasuya", "Dera Baba Nanak", "Dera Bassi", "Dharamkot", "Dhuri", "Dina Nagar (SC)", "Dirba", "Faridkot", "Fatehgarh Churian", "Fatehgarh Sahib", "Fazilka", "Firozpur City", "Firozpur Rural (SC)", "Garhshankar", "Ghanaur", "Gidderbaha", "Gill (SC)", "Gurdaspur", "Guru Har Sahai", "Hoshiarpur", "Jagraon (SC)", "Jaitu (SC)", "Jalalabad", "Jalandhar Cantt.", "Jalandhar Central", "Jalandhar North", "Jalandhar West (SC)", "Jandiala (SC)", "Kapurthala", "Kartarpur (SC)", "Khadoor Sahib", "Khanna", "Kharar", "Khem Karan", "Kotkapura", "Lambi", "Lehra", "Ludhiana Central", "Ludhiana East", "Ludhiana North", "Ludhiana South", "Ludhiana West", "Majitha", "Malerkotla", "Malout (SC)", "Mansa", "Maur", "Mehal Kalan (SC)", "Moga", "Mukerian", "Muktsar", "Nabha (SC)", "Nakodar", "Nawan Shahr", "Nihal Singhwala (SC", "Pathankot", "Patiala", "Patiala Rural", "Patti", "Payal (SC)", "Phagwara (SC)", "Phillaur (SC)", "Qadian", "Raikot (SC)", "Raja Sansi", "Rajpura", "Rampura Phul", "Rupnagar", "S.A.S.Nagar", "Sahnewal", "Samana", "Samrala", "Sangrur", "Sanour", "Sardulgarh", "Shahkot", "Sham Chaurasi (SC)", "Shutrana (SC)", "Sri Hargobindpur (S", "Sujanpur", "Sultanpur Lodhi", "Sunam", "Talwandi Sabo", "Tarn Taran", "Urmar", "Zira"],
        //     "S20_Rajasthan": ["'Rajgarh-Laxmangarh", "Adarsh Nagar", "Ahore", "Ajmer North", "Ajmer South (SC)", "Alwar Rural (SC)", "Alwar Urban", "Amber", "Anta", "Anupgarh (SC)", "Asind", "Aspur (ST)", "Bagidora(ST)", "Bagru (SC)", "Bali", "Bamanwas(ST)", "Bandikui", "Bansur", "Banswara(ST)", "Baran?Atru (SC)", "Bari", "Bari Sadri", "Barmer", "Baseri (SC)", "Bassi (ST)", "Bayana (SC)", "Baytoo", "Beawar", "Begun", "Behror", "Bhadra", "Bharatpur", "Bhilwara", "Bhim", "Bhinmal", "Bhopalgarh(SC)", "Bikaner East", "Bikaner West", "Bilara (SC)", "Bundi", "Chaksu (SC)", "Chhabra", "Chittorgarh", "Chohtan (SC)", "Chomu", "Chorasi (ST)", "Churu", "Civil Lines", "Dag (SC)", "Danta Ramgarh", "Dausa", "Deedwana", "Deeg-Kumher", "Degana", "Deoli-Uniara", "Dhariawad(ST)", "Dhod (SC)", "Dholpur", "Dudu (SC)", "Dungargarh", "Dungarpur(ST)", "Fatehpur", "Ganganagar", "Gangapur", "Garhi", "Ghatol (ST)", "Gogunda(ST)", "Gudha Malani", "Hanumangarh", "Hawa Mahal", "Hindaun (SC)", "Hindoli", "Jahazpur", "Jaisalmer", "Jaitaran", "Jalore (SC)", "Jamwa Ramgarh (ST)", "Jayal (SC)", "Jhadol(ST)", "Jhalrapatan", "Jhotwara", "Jhunjhunu", "Jodhpur", "KIshan Pole", "Kaman", "Kapasan(SC)", "Karanpur", "Karauli", "Kathumar (SC)", "Kekri", "Keshoraipatan(SC)", "Khajuwala(SC)", "Khandar (SC)", "Khandela", "Khanpur", "Kherwara(ST)", "Khetri", "Khinwsar", "Kishanganj", "Kishangarh", "Kishangarh bas", "Kolayat", "Kota North", "Kota South", "Kotputli", "Kumbhalgarh", "Kushalgarh(ST)", "Lachhmangarh", "Ladnun", "Ladpura", "Lalsot (ST)", "Lohawat", "Luni", "Lunkaransar", "Mahuwa", "Makrana", "Malpura", "Malviya Nagar", "Mandal", "Mandalgarh", "Mandawa", "Manohar Thana", "Marwar Junction", "Masuda", "Mavli", "Merta (SC)", "Mundawar", "Nadbai", "Nagar", "Nagaur", "Nasirabad", "Nathdwara", "Nawalgarh", "Nawan", "Neema Ka Thana", "Nimbahera", "Niwai (SC)", "Nohar", "Nokha", "Osian", "Pachpadra", "Pali", "Parbatsar", "Phalodi", "Phulera", "Pilani (SC)", "Pilibanga (SC)", "Pindwara Abu (ST)", "Pipalda", "Pokaran", "Pratapgarh(ST)", "Pushkar", "Raisinghnagar(SC)", "Rajakhera", "Rajsamand", "Ramganj Mandi", "Ramgarh", "Raniwara", "Ratangarh", "Reodar(SC)", "Sadulpur", "Sadulshahar", "Sagwara(ST)", "Sahara", "Salumber(ST)", "Sanchore", "Sanganer", "Sangaria", "Sangod", "Sapotra (ST)", "Sardarpura", "Sardarshahar", "Sawai Madhopur", "Shahpura", "Shahpura(SC)", "Sheo", "Shergarh", "Sikar", "Sikrai (SC)", "Sirohi", "Siwana", "Sojat (SC)", "Soorsagar", "Srimadhopur", "Sujangarh(SC)", "Sumerpur", "Surajgarh", "Surat", "Taranagar", "Thanagazi", "Tijara", "Todabhim(ST)", "Tonk", "Udaipur", "Udaipur Rural", "Udaipurwati", "Vallabhnagar", "Vidhyadhar Nagar", "Viratnagar", "Weir (SC)"],
        //     "S21_Sikkim": ["Arithang", "Barfung(BL)", "Chujachen", "Daramdin(BL)", "Djongu(BL)", "Gangtok(BL)", "Gnathang-Machong", "Gyalshing-Barnyak", "Kabi Lungchuk(BL)", "Khamdong-Singtam", "Lachen Mangan", "Maneybung-Dentam", "Martam-Rumtek (BL)", "Melli", "Namcheybung", "Namchi-Singhithang", "Namthang-Rateypani", "Poklok-Kamrang", "Rangang-Yangang", "Rhenock", "Rinchenpong(BL)", "Salghari-Zoom (SC)", "Shyari(BL)", "Soreong-Chakung", "Temi-Namphing", "Tumen-Lingi(BL)", "Upper Burtuk", "Upper Tadong", "West Pendam(SC)", "Yangthang", "Yoksam-Tashiding(BL)"],
        //     "S22_Tamil Nadu": ["Alandur", "Alangudi", "Alangulam", "Ambasamudram", "Ambattur", "Ambur", "Anaikattu", "Andipatti", "Anna Nagar", "Anthiyur", "Arakkonam (SC)", "Arani", "Aranthangi", "Aravakurichi", "Arcot", "Ariyalur", "Aruppukkottai", "Athoor", "Attur(SC)", "Avadi", "Avanashi (SC)", "Bargur", "Bhavani", "Bhavanisagar", "Bhuvanagiri", "Bodinayakanur", "Chengalpattu", "Chengam (SC)", "Chepauk-Thiruvalliken", "Cheyyar", "Cheyyur", "Chidambaram", "Coimbatore(North)", "Coimbatore(South)", "Colachel", "Coonoor", "Cuddalore", "Cumbum", "Dharapuram (SC)", "Dharmapuri", "Dindigul", "Dr.Radhakrishnan Naga", "Edappadi", "Egmore (SC)", "Erode (East)", "Erode (West)", "Gandharvakottai(SC)", "Gangavalli (SC)", "Gobichettipalayam", "Gudalur (SC)", "Gudiyattam (SC)", "Gummidipoondi", "Harbour", "Harur (SC)", "Hosur", "Jayankondam", "Jolarpet", "Kadayanallur", "Kalasapakkam", "Kallakurichi (SC)", "Kancheepuram", "Kangayam", "Kanniyakumari", "Karaikudi", "Karur", "Katpadi", "Kattumannarkoil(SC)", "Kavundampalayam", "Killiyoor", "Kilpennathur", "Kilvaithinankuppam(SC", "Kilvelur (SC)", "Kinathukadavu", "Kolathur", "Kovilpatti", "Krishnagiri", "Krishnarayapuram(SC)", "Kulithalai", "Kumarapalayam", "Kumbakonam", "Kunnam", "Kurinjipadi", "Lalgudi", "Madathukulam", "Madavaram", "Madurai Central", "Madurai East", "Madurai North", "Madurai South", "Madurai West", "Madurantakam (SC)", "Maduravoyal", "Mailam", "Manachanallur", "Manamadurai(SC)", "Manapparai", "Mannargudi", "Mayiladuthurai", "Melur", "Mettuppalayam", "Mettur", "Modakkurichi", "Mudhukulathur", "Musiri", "Mylapore", "Nagapattinam", "Nagercoil", "Namakkal", "Nanguneri", "Nannilam", "Natham", "Neyveli", "Nilakkottai (SC)", "Oddanchatram", "Omalur", "Orathanadu", "Ottapidaram", "Padmanabhapuram", "Palacodu", "Palani", "Palayamkottai", "Palladam", "Pallavaram", "Panruti", "Papanasam", "Pappireddippatti", "Paramakudi (SC)", "Paramathi-Velur", "Pattukkottai", "Pennagaram", "Perambalur (SC)", "Perambur", "Peravurani", "Periyakulam", "Perundurai", "Pollachi", "Polur", "Ponneri (SC)", "Poompuhar", "Poonamallee (SC)", "Pudukkottai", "RAMANATHAPURAM", "Radhapuram", "Rajapalayam", "Ramanathapuram", "Ranipet", "Rasipuram (SC)", "Rishivandiyam", "Royapuram", "Saidapet", "Salem (North)", "Salem (South)", "Salem (West)", "Sankarankovil(SC)", "Sankarapuram", "Sankari", "Sattur", "Senthamangalam(ST)", "Sholavandan(SC)", "Sholingur", "Shozhinganallur", "Singanallur", "Sirkazhi (SC)", "Sivaganga", "Sivakasi", "Sriperumbudur (SC)", "Srirangam", "Srivaikuntam", "Srivilliputhur(SC)", "Sulur", "Tambaram", "Tenkasi", "Thalli", "Thanjavur", "Thiru-Vi-Ka-Nagar(SC)", "Thirumangalam", "Thirumayam", "Thiruparankundram", "Thiruporur", "Thiruthuraipoondi(SC)", "Thiruvaiyaru", "Thiruvallur", "Thiruvarur", "Thiruverumbur", "Thiruvidaimarudur", "Thiyagarayanagar", "Thondamuthur", "Thoothukkudi", "Thousand Lights", "Thuraiyur (SC)", "Tindivanam (SC)", "Tiruchendur", "Tiruchengodu", "Tiruchirappalli", "Tiruchuli", "Tirukkoyilur", "Tirunelveli", "Tiruppattur", "Tiruppur (North)", "Tiruppur (South)", "Tiruttani", "Tiruvadanai", "Tiruvannamalai", "Tiruvottiyur", "Tittakudi (SC)", "Udhagamandalam", "Udumalaipettai", "Ulundurpettai", "Usilampatti", "Uthangarai (SC)", "Uthiramerur", "Valparai (SC)", "Vandavasi (SC)", "Vaniyambadi", "Vanur", "Vasudevanallur(SC)", "Vedaranyam", "Vedasandur", "Veerapandi", "Velachery", "Vellore", "Veppanahalli", "Vikravandi", "Vilathikulam", "Vilavancode", "Villivakkam", "Viluppuram", "Viralimalai", "Virudhunagar", "Virugampakkam", "Vriddhachalam", "Yercaud (ST)"],
        //     "S29_Telangana": ["Achampet (SC)", "Adilabad", "Alair", "Alampur (SC)", "Amberpet", "Andole (SC)", "Armur", "Asifabad (ST)", "Aswaraopeta (ST)", "Bahadurpura", "Balkonda", "Banswada", "Bellampalle (SC)", "Bhadrachalam (ST)", "Bhongir", "Bhupalpalle", "Boath (ST)", "Bodhan", "Chandrayangutta", "Charminar", "Chennur (SC)", "Chevella (SC)", "Choppadandi (SC)", "Devarakonda (ST)", "Devarkadra", "Dharmapuri (SC)", "Dornakal (ST)", "Dubbak", "Gadwal", "Gajwel", "Ghanpur (Station) (SC)", "Goshamahal", "Husnabad", "Huzurabad", "Huzurnagar", "Ibrahimpatnam", "Jadcherla", "Jagtial", "Jangoan", "Jubilee Hills", "Jukkal (SC)", "Kalwakurthy", "Kamareddy", "Karimnagar", "Karwan", "Khairatabad", "Khammam", "Khanapur (ST)", "Kodad", "Kodangal", "Kollapur", "Koratla", "Kothagudem", "Kukatpalle", "Lal Bahadur Nagar", "Madhira (SC)", "Mahabubabad (ST)", "Mahbubnagar", "Maheswaram", "Makthal", "Malakpet", "Malkajgiri", "Manakondur (SC)", "Mancherial", "Manthani", "Medak", "Medchal", "Miryalaguda", "Mudhole", "Mulug (ST)", "Munugode", "Musheerabad", "Nagarjuna Sagar", "Nagarkurnool", "Nakrekal (SC)", "Nalgonda", "Nampally", "Narayankhed", "Narayanpet", "Narsampet", "Narsapur", "Nirmal", "Nizamabad (Rural)", "Nizamabad (Urban)", "Palair", "Palakurthi", "Pargi", "Parkal", "Patancheru", "Peddapalle", "Pinapaka (ST)", "Quthbullapur", "Rajendranagar", "Ramagundam", "Sanathnagar", "Sangareddy", "Sathupalle (SC)", "Secunderabad", "Secunderabad Cantt. (SC", "Serilingampally", "Shadnagar", "Siddipet", "Sircilla", "Sirpur", "Suryapet", "Tandur", "Thungathurthi (SC)", "Uppal", "Vemulawada", "Vicarabad (SC)", "Wanaparthy", "Waradhanapet (SC)", "Warangal East", "Warangal West", "Wyra (ST)", "Yakutpura", "Yellandu (ST)", "Yellareddy", "Zahirabad (SC)"],
        //     "S23_Tripura": ["AGARTALA", "AMARPUR", "AMBASSA (ST)", "AMPINAGAR (ST)", "ASHARAMBARI (ST)", "BADHARGHAT (SC)", "BAGBASSA", "BAGMA (ST)", "BAMUTIA (SC)", "BANAMALIPUR", "BARJALA (SC)", "BELONIA", "BISHALGARH", "BOXANAGAR", "CHANDIPUR", "CHARILAM (ST)", "CHHAWMANU (ST)", "DHANPUR", "DHARMANAGAR", "FATIKROY (SC)", "GOLAGHATI (ST)", "HRISHYAMUKH", "JOLAIBARI (ST)", "JUBARAJNAGAR", "KADAMTALA - KURTI", "KAILASAHAR", "KAKRABAN-SALGARAH(SC)", "KALYANPUR-PRAMODENAGAR", "KAMALASAGAR", "KAMALPUR", "KANCHANPUR (ST)", "KARAMCHHARA (ST)", "KHAYERPUR", "KHOWAI", "KRISHNAPUR (ST)", "Karbook", "MAJLISHPUR", "MANDAIBAZAR(ST)", "MANU (ST)", "MATARBARI", "MOHANPUR", "NALCHAR (SC)", "PABIACHHARA (SC)", "PANISAGAR", "PENCHARTHAL (ST)", "PRATAPGARH (SC)", "RADHAKISHOREPUR", "RAIMA VALLEY (ST)", "RAJNAGAR (SC)", "RAMCHANDRAGHAT(ST)", "RAMNAGAR", "SABROOM", "SANTIRBAZAR (ST)", "SIMNA (ST)", "SONAMURA", "SURMA (SC)", "SURYAMANINAGAR", "TAKARJALA (ST)", "TELIAMURA", "TOWN BORDOWALI"],
        //     "S24_Uttar Pradesh": ["Agra Cantt. ", "Agra North", "Agra Rural ", "Agra South", "Ajagara ", "Akbarpur", "Akbarpur-Raniya", "Alapur ", "Aliganj", "Aligarh", "Allahabad North", "Allahabad South", "Allahabad West", "Amanpur", "Amethi", "Amritpur", "Amroha", "Anupshahr", "Aonla", "Arya Nagar", "Asmoli", "Atrauli", "Atrauliya", "Aurai ", "Auraiya ", "Ayah Shah", "Ayodhya", "Azamgarh", "Babaganj ", "Baberu", "Babina", "Bachhrawan ", "Badaun", "Badlapur", "Baghpat", "Bah", "Baheri", "Bahraich", "Bairia", "Bakshi Kaa Talab", "Balamau ", "Baldev ", "Balha ", "Ballia Nagar", "Balrampur ", "Banda", "Bangermau", "Bansdih", "Bansgaon ", "Bansi", "Bara ", "Barabanki", "Barauli", "Baraut", "Bareilly", "Bareilly Cantt.", "Barhaj", "Barhapur", "Barkhera", "Basti Sadar", "Behat", "Belthara Road ", "Bhadohi", "Bhagwantnagar", "Bharthana ", "Bhatpar Rani", "Bhinga", "Bhognipur", "Bhojipura", "Bhojpur", "Bhongaon", "Bidhuna", "Bijnor", "Bikapur", "Bilari", "Bilaspur", "Bilgram-Mallanwan", "Bilhaur ", "Bilsi", "Bindki", "Bisalpur", "Bisauli ", "Biswan", "Bithari Chainpur", "Bithoor", "Budhana", "Bulandshahr", "Caimpiyarganj", "Chail", "Chakia ", "Chamraua", "Chandausi ", "Chandpur", "Charkhari", "Charthawal", "Chauri-Chaura", "Chhanbey ", "Chhaprauli", "Chharra", "Chhata", "Chhibramau", "Chillupar", "Chitrakoot", "Chunar", "Colonelganj", "Dadraul", "Dadri", "Dariyabad", "Dataganj", "Debai", "Deoband", "Deoria", "Dhampur", "Dhanaura ", "Dhanghata ", "Dhaurahra", "Dholana", "Dibiyapur", "Didarganj", "Domariyaga", "Duddhi ", "Etah", "Etawah", "Etmadpur", "Faridpur ", "Farrukhabad", "Fatehabad", "Fatehpur", "Fatehpur Sikri", "Fazilnagar", "Firozabad", "Gainsari", "Gangoh", "Garautha", "Garhmukteshwar", "Gaura", "Gauriganj", "Ghatampur ", "Ghaziabad", "Ghazipur", "Ghorawal", "Ghosi", "Gola Gokrannath", "Gonda", "Gopalpur", "Gopamau ", "Gorakhpur Rural", "Gorakhpur Urban", "Goshainganj", "Goverdhan", "Govindnagar", "Gunnaur", "Gyanpur", "Haidergarh ", "Hamirpur", "Handia", "Hapur ", "Harchandpur", "Hardoi", "Hargaon ", "Harraiya", "Hasanpur", "Hastinapur ", "Hata", "Hathras ", "Husainganj", "Iglas ", "Isauli", "Itwa", "Jagdishpur ", "Jahanabad", "Jakhanian", "Jalalabad", "Jalalpur", "Jalesar ", "Jangipur ", "Jasrana", "Jaswantnagar", "Jaunpur", "Jewar", "Jhansi Nagar", "Kadipur ", "Kaimganj ", "Kairana", "Kaiserganj", "Kalpi", "Kalyanpur", "Kannauj ", "Kanpur Cantt.", "Kanth", "Kapilvastu ", "Kaptanganj", "Karachhana", "Karhal", "Kasganj", "Kasta ", "Katehari", "Katra", "Katra Bazar", "Kerakat ", "Khadda", "Khaga ", "Khair ", "Khajani ", "Khalilabad", "Khatauli", "Kheragarh", "Khurja ", "Kidwai Nagar", "Kishani ", "Kithore", "Koil", "Koraon ", "Kunda", "Kundarki", "Kursi", "Kushinagar", "Laharpur", "Lakhimpur", "Lalganj ", "Lalitpur", "Lambhua", "Loni", "Lucknow Cantt.", "Lucknow Central", "Lucknow East", "Lucknow North", "Lucknow West", "Machhlishahr ", "Madhaugarh", "Madhuban", "Mahadewa ", "Maharajganj ", "Maharajpur", "Mahasi", "Mahmoodabad", "Mahoba", "Maholi", "Mainpuri", "Majhawan", "Malhani", "Malihabad ", "Manikpur", "Manjhanpur ", "Mankapur ", "Mant", "Marhara", "Marihan", "Mariyahu", "Matera", "Mathura", "Mau", "Mauranipur ", "Meerapur", "Meerganj", "Meerut", "Meerut Cantt.", "Meerut South", "Mehnagar ", "Mehnaun", "Mehroni ", "Meja", "Menhdawal", "Milak ", "Milkipur ", "Mirzapur", "Misrikh ", "Modi Nagar", "Mohammadabad", "Mohammdi", "Mohan ", "Mohanlalganj ", "Moradabad Nagar", "Moradabad Rural", "Mubarakpur", "Mughalsarai", "Muhammadabad-Gohna ", "Mungra Badshahpur", "Muradnagar", "Muzaffar Nagar", "Nagina ", "Najibabad", "Nakur", "Nanpara", "Naraini ", "Naugawan Sadat", "Nautanwa", "Nawabganj", "Nehtaur ", "Nighasan", "Nizamabad", "Noida", "Noorpur", "Obra", "Orai ", "Padrauna", "Palia", "Paniyra", "Pathardeva", "Patiyali", "Patti", "Payagpur", "Phaphamau", "Pharenda", "Phephana", "Phoolpur-Pawai", "Phulpur", "Pilibhit", "Pindra", "Pipraich", "Powayan ", "Pratapgarh", "Pratappur", "Puranpur ", "Purqazi ", "Purwa", "Rae Bareli", "Ram Nagar", "Ramkola ", "Rampur", "Rampur Karkhana", "Rampur Khas", "Rampur Maniharan", "Raniganj", "Rasara", "Rasulabad ", "Rath ", "Robertsganj", "Rohaniya", "Rudauli", "Rudhauli", "Rudrapur", "Sadabad", "Sadar", "Safipur ", "Sagri", "Sahajanwa", "Saharanpur", "Saharanpur Nagar", "Sahaswan", "Sahibabad", "Saidpur ", "Saiyadraja", "Sakaldiha", "Salempur ", "Salon ", "Sambhal", "Sandi ", "Sandila", "Sardhana", "Sareni", "Sarojini Nagar", "Sawaijpur", "Sevapuri", "Sevata", "Shahabad", "Shahganj", "Shahjahanpur", "Shamli", "Shekhupur", "Shikarpur", "Shikohabad", "Shivpur", "Shohratgarh", "Shrawasti", "Sidhauli ", "Sikanderpur", "Sikandra", "Sikandra Rao", "Sikandrabad", "Sirathu", "Sirsaganj", "Sishamau", "Siswa", "Sitapur", "Siwalkhas", "Soraon ", "Sri Nagar ", "Suar", "Sultanpur", "Syana", "Tamkuhi Raj", "Tanda", "Tarabganj", "Thakurdwara", "Thana Bhawan", "Tilhar", "Tiloi", "Tindwari", "Tirwa", "Tulsipur", "Tundla ", "Unchahar", "Unnao", "Utraula", "Varanasi Cantt.", "Varanasi North", "Varanasi South", "Zafrabad", "Zahoorabad", "Zaidpur ", "Zamania"],
        //     "S28_Uttarakhand": ["Almora", "B.H.E.L. Ranipu", "Badrinath", "Bageshwar (SC)", "Bajpur (SC)", "Bhagwanpur (SC)", "Bhimtal", "Chakrata (ST)", "Champawat", "Chaubattakhal", "Dehradun Cantt.", "Deoprayag", "Dhanolti", "Dharampur", "Dharchula", "Didihat", "Doiwala", "Dwarahat", "Gadarpur", "Gangolihat (SC)", "Gangotri", "Ghanshali (SC)", "Haldwani", "Hardwar", "Hardwar Rural", "Jageshwar", "Jaspur", "Jhabrera (SC)", "Jwalapur (SC)", "Kaladhungi", "Kapkote", "Karnprayag", "Kashipur", "Kedarnath", "Khanpur", "Khatima", "Kichha", "Kotdwar", "Laksar", "Lalkuwa", "Lansdowne", "Lohaghat", "Manglaur", "Mussoorie", "Nainital (SC)", "Nanak Matta (ST", "Narendranagar", "Pauri (SC)", "Pirankaliyar", "Pithoragarh", "Pratapnagar", "Purola (SC)", "Raipur", "Rajpur Road (SC", "Ramnagar", "Ranikhet", "Rishikesh", "Roorkee", "Rudraprayag", "Rudrapur", "Sahaspur", "Salt", "Sitarganj", "Someshwar (SC)", "Srinagar", "Tehri", "Tharali (SC)", "Vikasnagar", "Yamkeshwar", "Yamunotri"],
        //     "S25_West Bengal": ["ALIPURDUARS", "AMDANGA", "AMTA", "ARAMBAG (SC)", "ASANSOL DAKSHIN", "ASANSOL UTTAR", "ASHOKNAGAR", "AUSGRAM (SC)", "BADURIA", "BAGDA (SC)", "BAGHMUNDI", "BAGNAN", "BAHARAMPUR", "BAISNABNAGAR", "BALAGARH (SC)", "BALARAMPUR", "BALLY", "BALLYGUNGE", "BALURGHAT", "BANDWAN (ST)", "BANGAON DAKSHIN (SC)", "BANGAON UTTAR (SC)", "BANKURA", "BARABANI", "BARANAGAR", "BARASAT", "BARDHAMAN DAKSHIN", "BARDHAMAN UTTAR", "BARJORA", "BARRACKPUR", "BARUIPUR PASCHIM", "BARUIPUR PURBA(SC)", "BASANTI (SC)", "BASIRHAT DAKSHIN", "BASIRHAT UTTAR", "BEHALA PASCHIM", "BEHALA PURBA", "BELDANGA", "BELEGHATA", "BHABANIPUR", "BHAGABANGOLA", "BHAGABANPUR", "BHANGAR", "BHARATPUR", "BHATAR", "BHATPARA", "BIDHANNAGAR", "BIJPUR", "BINPUR (ST)", "BISHNUPUR", "BISHNUPUR (SC)", "BOLPUR", "BUDGE BUDGE", "BURWAN (SC)", "CANNING PASCHIM(SC)", "CANNING PURBA", "CHAKDAHA", "CHAKULIA", "CHAMPDANI", "CHANCHAL", "CHANDANNAGAR", "CHANDIPUR", "CHANDITALA", "CHANDRAKONA (SC)", "CHAPRA", "CHHATNA", "CHOPRA", "CHOWRANGEE", "CHUNCHURA", "COOCHBEHAR DAKSHIN", "COOCHBEHAR UTTAR (SC)", "DABGRAM-PHULBARI", "DANTAN", "DARJEELING", "DASPUR", "DEBRA", "DEGANGA", "DHANEKHALI(SC)", "DHUPGURI (SC)", "DIAMOND HARBOUR", "DINHATA", "DOMJUR", "DOMKAL", "DUBRAJPUR (SC)", "DUM DUM", "DUM DUM UTTAR", "DURGAPUR PASCHIM", "DURGAPUR PURBA", "EGRA", "ENGLISH BAZAR", "ENTALLY", "FALAKATA (SC)", "FALTA", "FARAKKA", "GAIGHATA (SC)", "GALSI (SC)", "GANGARAMPUR (SC)", "GARBETA", "GAZOLE (SC)", "GHATAL (SC)", "GOALPOKHAR", "GOGHAT (SC)", "GOPIBALLAVPUR", "GOSABA (SC)", "HABIBPUR (ST)", "HABRA", "HALDIA (SC)", "HANSAN", "HARIHARPARA", "HARINGHATA (SC)", "HARIPAL", "HARIRAMPUR", "HARISCHANDRAPUR", "HAROA", "HEMTABAD (SC)", "HINGALGANJ (SC)", "HOWRAH DAKSHIN", "HOWRAH MADHYA", "HOWRAH UTTAR", "INDUS (SC)", "ISLAMPUR", "ITAHAR", "JADAVPUR", "JAGATBALLAVPUR", "JAGATDAL", "JALANGI", "JALPAIGURI (SC)", "JAMALPUR (SC)", "JAMURIA", "JANGIPARA", "JANGIPUR", "JAYNAGAR (SC)", "JHARGRAM", "JORASANKO", "JOYPUR", "KAKDWIP", "KALCHINI (ST)", "KALIAGANJ (SC)", "KALIGANJ", "KALIMPONG", "KALNA (SC)", "KALYANI (SC)", "KAMARHATI", "KANDI", "KANTHI DAKSHIN", "KANTHI UTTAR", "KARANDIGHI", "KARIMPUR", "KASBA", "KASHIPUR", "KASHIPURBELGACHHIA", "KATULPUR (SC)", "KATWA", "KESHIARY (ST)", "KESHPUR (SC)", "KETUGRAM", "KHANAKUL", "KHANDAGHOSH (SC)", "KHARAGPUR", "KHARAGPUR SADAR", "KHARDAHA", "KHARGRAM (SC)", "KHEJURI (SC)", "KOLKATA PORT", "KRISHNAGANJ (SC)", "KRISHNANAGAR DAKSHIN", "KRISHNANAGAR UTTAR", "KULPI", "KULTALI (SC)", "KULTI", "KUMARGANJ", "KUMARGRAM (ST)", "KURSEONG", "KUSHMANDI (SC)", "LABPUR", "LALGOLA", "MADARIHAT (ST)", "MADHYAMGRAM", "MAGRAHAT PASCHIM", "MAGRAHAT PURBA(SC)", "MAHESHTALA", "MAHISADAL", "MAL (ST)", "MALATIPUR", "MALDAHA (SC)", "MANBAZAR (ST)", "MANDIRBAZAR (SC)", "MANGALKOT", "MANIKCHAK", "MANIKTALA", "MATHABHANGA (SC)", "MATIGARA-NAXALBARI(SC)", "MAYNAGURI (SC)", "MAYURESWAR", "MEDINIPUR", "MEKLIGANJ", "MEMARI", "METIABURUZ", "MINAKHAN (SC)", "MONTESWAR", "MOTHABARI", "MOYNA", "MURARAI", "MURSHIDABAD", "NABADWIP", "NABAGRAM (SC)", "NAGRAKATA (ST)", "NAIHATI", "NAKASHIPARA", "NALHATI", "NANDAKUMAR", "NANDIGRAM", "NANOOR (SC)", "NAODA", "NARAYANGARH", "NATABARI", "NAYAGRAM (ST)", "NOAPARA", "ONDA", "PALASHIPARA", "PANCHLA", "PANDABESWAR", "PANDUA", "PANIHATI", "PANSKURA PASCHIM", "PANSKURA PURBA", "PARA (SC)", "PATASHPUR", "PATHARPRATIMA", "PHANSIDEWA (ST)", "PINGLA", "PURBASTHALI DAKSHIN", "PURBASTHALI UTTAR", "PURSURAH", "PURULIA", "RAGHUNATHGANJ", "RAGHUNATHPUR(SC)", "RAIDIGHI", "RAIGANJ", "RAINA (SC)", "RAIPUR (ST)", "RAJARHAT GOPALPUR", "RAJARHAT NEW TOWN", "RAJGANJ (SC)", "RAMNAGAR", "RAMPURHAT", "RANAGHAT DAKSHIN (SC)", "RANAGHAT UTTAR PASCHIM", "RANAGHAT UTTAR PURBA(SC)", "RANIBANDH (ST)", "RANIGANJ", "RANINAGAR", "RASHBEHARI", "RATUA", "REJINAGAR", "SABANG", "SAGAR", "SAGARDIGHI", "SAINTHIA (SC)", "SALBONI", "SALTORA (SC)", "SAMSERGANJ", "SANDESHKHALI (ST)", "SANKRAIL (SC)", "SANTIPUR", "SAPTAGRAM", "SATGACHHIA", "SHIBPUR", "SHYAMPUKUR", "SHYAMPUR", "SILIGURI", "SINGUR", "SITAI (SC)", "SITALKUCHI (SC)", "SONAMUKHI (SC)", "SONARPUR DAKSHIN", "SONARPUR UTTAR", "SREERAMPUR", "SUJAPUR", "SURI", "SUTI", "SWARUPNAGAR", "TALDANGRA", "TAMLUK", "TAPAN(ST)", "TARAKESWAR", "TEHATTA", "TOLLYGANJ", "TUFANGANJ", "UDAYNARAYANPUR", "ULUBERIA DAKSHIN", "ULUBERIA PURBA", "ULUBERIA UTTAR (SC)", "UTTARPARA"]
        // };
        var arr = [];

        console.log("Area screen");
        console.log(dict);
        


        for (var key in dict) {
            let data = dict[key];
            let itemCode = key.split("_");
            let code = itemCode[0];
            let item = itemCode[1];

            data.sort(function (a, b) {

                return a.localeCompare(b);
            })

            arr.push({ data: data, title: item, code: code });
        }

        arr.sort(function (a, b) {

            return a.title.localeCompare(b.title);
        })



        this.setState({ originalData: arr })
    }



    updateSearch = searchText => {
        var search = searchText;
        // this.setState({ search });
        if (search === '') {
            this.sectionSelected = -1;
            this.resetToDefault();
            // this.setState({search : search });
            return;
        }
        this.sectionSelected = -2;



        let data = JSON.parse(JSON.stringify(this.state.originalData));
        var objectNew = [];
        for (let i = 0; i < data.length; i++) {



            let object = data[i]
            let dataArray = object["data"];

            const newData = dataArray.filter(function (item) {
                //applying filter for the inserted text in search bar
                const itemData = item ? item.toUpperCase() : ''.toUpperCase();
                const textData = search.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            // let object = data[0];
            // object["data"] = newData;

            // objectNew.push({data : newData , })
            if (newData.length > 0) {
                objectNew.push({ data: newData, title: object["title"], code: object["code"] });
            }

        }


        this.setState({ data: objectNew, search: searchText });

    };

    hitServerToUpdateData = (thisObject , section, area) => {

        // alert(idex + "  " + JSON.stringify(section));
        let code = section["code"];
        // let area = section["code"];

        let body = JSON.stringify({
            userId: this.props.userId,
            userState: code,
            userPolArea: area

        })
        this.refs.loading.show();
        fetch(UPDATE_USER_AREA, {
            method: 'POST',
            headers: authHeaders(),
            body: body,
        }).then((response) => response.json())
            .then((responseJson) => {
                let username = this.props.username;
                let responseData = this.props.responseData;
                let data = {
                    email: responseData.userEmail,
                    image: responseData.userImageData,
                    name: responseData.userFirstName,
                    username: responseData.userName,
                    mobileNumber: this.props.mobileNumber,
                    code: this.props.code
                }

                // axios.post(LANDING_TOP_SIX, {
                //     userId: responseData.userId,
                // })
                // .then(response_2 => {

                let languageArry = "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
                let menuArr = languageArry.split(',');
                // let responseData_2 = response_2.data;
                // let menuArr = responseData_2.extraImageFile3.split(',');
                saveUserID(this.props.userId);


                thisObject.refs.loading.close();

                let dict = {
                    email: null,
                    firstName: thisObject.props.firstName,
                    lastName: thisObject.props.lastName,
                    image: thisObject.props.image,
                    username: username,
                    mobileNumber: thisObject.props.mobileNumber,
                    code: thisObject.props.code,
                    userId: thisObject.props.userId,
                    selectedAgeGroupCode: thisObject.props.selectedAgeGroupCode,
                    description: thisObject.props.description,
                    userDesignation: thisObject.props.userDesignation,
                    gender: thisObject.props.gender,
                    userLanguage: thisObject.props.userLanguage
                };

                saveUserData(dict);

                setTimeout(function () {
                    Navigation.push(thisObject.props.componentId, {
                        component: {
                            id: 'Profile',
                            name: 'Profile',
                            passProps: {

                                ...dict,

                                language: menuArr ? menuArr[5] : null,
                                male: menuArr ? menuArr[6] : null,
                                female: menuArr ? menuArr[7] : null,
                                selProfession: menuArr ? menuArr[8] : null,
                                student: menuArr ? menuArr[9] : null,
                                salaried: menuArr ? menuArr[10] : null,
                                entrepreneur: menuArr ? menuArr[11] : null,
                                retired: menuArr ? menuArr[12] : null,
                                housewife: menuArr ? menuArr[13] : null,
                                other: menuArr ? menuArr[14] : null,
                                selAgeGroup: menuArr ? menuArr[15] : null,
                                teenager: menuArr ? menuArr[16] : null,
                                twenties: menuArr ? menuArr[17] : null,
                                thirties: menuArr ? menuArr[18] : null,
                                fourties: menuArr ? menuArr[19] : null,
                                fifties: menuArr ? menuArr[20] : null,
                                aboveSixty: menuArr ? menuArr[21] : null,
                            },
                            options: {
                                topBar: {
                                    visible: false,
                                    animate: false,
                                    drawBehind: true
                                }
                            }
                        },
                    });
                }, 500);
                // })
                // .catch(error => {
                //     console.log(error)
                // })
            })
            .catch((error) => {
                this.refs.loading.close();
                console.error(error);
            });


    }



    homeButtonTapped = () => {
        Navigation.pop(this.props.componentId);
    };
    SearchFilterFunction(text) {

        console.log(text);

        const newData = this.state.originalData.filter(function (item) {
            const itemData = item.title.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        });
        console.log(newData);
        this.setState({
            data: newData,
            searchState: text
        })
    }
    SearchFilterFunction2(text) {

        console.log(text);

        const newData = this.state.selectedStateData.data.filter(function (item) {
            const itemData = item.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        });
        console.log(newData);
        this.setState({
            searchContituencyList: newData,
            searchContituency: text
        })
    }
    showTextWithOnPress = (text, onPress) => {
        return (
            <View style={styles.TextInputStyleClass}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
                    <Text> {text} </Text>
                </TouchableOpacity>
            </View>
        )
    }
    showSearch = () => {
        if (this.state.selectedContituency) {
            return (<View style={styles.MainContainer}>
                {this.showTextWithOnPress(this.state.selectedStateData.title, () => this.setState({ selectedStateData: null, selectedContituency: null, searchContituency: null }))}

                {this.showTextWithOnPress(this.state.selectedContituency, () => this.setState({ selectedContituency: null }))}
                <View style={styles.TextInputStyleClass}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                        this.hitServerToUpdateData(this,this.state.selectedStateData,this.state.selectedContituency);
                    }}>
                        <Text style = {{color : APP_GLOBAL_COLOR}}> SUBMIT </Text>
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.TextInputStyleClass} onPress={() => this.setState({ selectedStateData: null, selectedContituency: null })}> {this.state.selectedStateData.title} bb </Text>
                <Text style={styles.TextInputStyleClass} onPress={() => this.setState({ selectedContituency: null })}> {this.state.selectedContituency} aa </Text> */}
            </View>);
        } else
            if (this.state.selectedStateData) {
                return (
                    <View style={styles.MainContainer}>
                        {this.showTextWithOnPress(this.state.selectedStateData.title, () => this.setState({ selectedStateData: null, selectedContituency: null, searchContituency: null }))}
                        <TextInput
                            style={styles.TextInputStyleClass}
                            onChangeText={(text) => this.SearchFilterFunction2(text)}
                            value={this.state.searchContituency}
                            underlineColorAndroid='transparent'
                            placeholder="Search your contituency"
                            autoFocus={true}
                        />
                        <FlatList data={this.state.searchContituencyList}

                            // renderSeparator={this.ListViewItemSeparator()}

                            renderItem={({ item }) => {
                                console.log('yyy');
                                console.log(item);
                                return (
                                    <TouchableOpacity style={{ flex: 1, padding: 5 }} onPress={() => this.setState({ searchContituency: item, selectedContituency: item })}>
                                        <Text style={styles.rowViewContainer}> {item} </Text>
                                    </TouchableOpacity>
                                );
                            }
                            }

                            // enableEmptySections={true}

                            style={{ marginTop: 10 }}

                        />
                    </View>
                );
            } else {
                return (<View style={styles.MainContainer}>

                    <TextInput
                        style={styles.TextInputStyleClass}
                        onChangeText={(text) => this.SearchFilterFunction(text)}
                        value={this.state.searchState}
                        underlineColorAndroid='transparent'
                        placeholder="Search your state"
                        autoFocus={true}
                    />

                    <FlatList data={this.state.data}

                        // renderSeparator={this.ListViewItemSeparator()}

                        renderItem={({ item }) => {
                            console.log('yyy');
                            console.log(item);
                            return (

                                <TouchableOpacity style={{ flex: 1, padding: 5 }} onPress={() => {
                                    this.setState({ selectedStateData: item, searchState: item.title, searchContituencyList: item.data })
                                }}>
                                    <Text style={styles.rowViewContainer}> {item.title} </Text>
                                </TouchableOpacity>)
                        }
                        }

                        // enableEmptySections={true}

                        style={{ marginTop: 10 }}

                    />

                </View>);
            }

    }
    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }


    render() {
        var { height, width } = Dimensions.get('window');

        let heightOfImage = (285 * width) / 640;

        const options = {
            behavior: Platform.OS === "ios" ? "padding" : "null"
        }

        return (
            <SafeAreaView
                forceInset={{ bottom: 'always' }}
                style={{ flex: 1 }}
                backgroundColor="white"
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}

                    enabled
                    {...options}
                >


                    <View style={styles.headerView} backgroundColor={APP_GLOBAL_COLOR}>

                        <View style={{ flex: 1, backgroundColor: 'clear' }}>
                            <CustomButton
                                source={require('../../assets/back.png')}
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    margin: normalize(5)
                                }}
                                onPress={this.homeButtonTapped}
                            />
                        </View>
                        <View style={styles.textheaderView}>
                            <Text style={styles.textView}> Select your constituency </Text>
                        </View>
                    </View>

                    {this.showSearch()}
                    <Loading
                        ref="loading" />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    phoneInput: {
        width: '70%',
        height: 50,
        margin: 10,
        padding: 5,
    },

    textheaderView: {
        flex: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },

    headerView: {
        // flex: 0.07,
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: 'white',
        height: Dimensions.get('window').height * 0.07
    },
    textView: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 15,
        fontSize: normalize(17),
        fontWeight: 'bold',
        color: 'white'
    },


    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 7,
        // alignItems : 'center'
        // backgroundColor: "red"
        // justifyContent : 'center

    },

    rowViewContainer: {
        fontSize: 15,
        padding: 10
    },

    TextInputStyleClass: {

        // alignSelf: 'center',
        marginTop: 10,
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7,
        backgroundColor: "#FFFFFF"

    }
});


