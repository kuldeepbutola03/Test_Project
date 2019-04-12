




import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Button,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import HeaderText from '../../components/UI/HeaderText/HeaderText'
import { EMAIL_REGISTRATION, DEBUG } from '../../../Apis';
import { validateEmail, saveUserID, authHeaders } from '../../../Constant';

import firebase from 'react-native-firebase';
import KochavaTracker from 'react-native-kochava-tracker';
export default class TcScreen extends Component {
    static propTypes = {
        componentId: PropTypes.string,
    };

    componentDidMount() {
        // this.getDataFromServer(true)
        firebase.analytics().setCurrentScreen("Screen", "Terms_And_Conditions_Screen");
        //firebase.analytics().logEvent("Trends_Screen");
        firebase.analytics().setUserProperty("Screen", "Terms_And_Conditions_Screen");
        firebase.analytics().logEvent("Content", { "Screen": "Terms_And_Conditions_Screen" });



        var eventMapObject = {};
        eventMapObject["screen_name"] = "Terms_And_Conditions_Screen";
        KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);

    }


    render() {
        var { height, width } = Dimensions.get('window');

        const options = {
            behavior: Platform.OS === "ios" ? "padding" : "null"
        }

        return (
            <SafeAreaView
                forceInset={{ bottom: 'always' }} style={styles.container}>

                <KeyboardAvoidingView style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    margin: 0

                }} enabled {...options}>
                    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                        <View style={{ margin: 20 }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Raajneeti Terms of Service
                        </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>EFFECTIVE DATE: March 6, 2019
                        </Text>
                            <Text style={{ fontSize: 12 }}>These Raajneeti Terms of Service (the "Terms") are a legal contract between you and Aureans Analytics Limited, a British Company  with registered office in UK ("Raajneeti ", "we" or "us"). These Terms explain how you are permitted to use the Raajneeti mobile application and services, as well as the Raajneeti website (www.raajneeti.in) (the "Site") and any content therein (collectively, the "Services"). Unless otherwise specified, all references to the Services include the services available through the Raajneeti mobile application (the "App") and the Site, as well as any software that Raajneeti  provides to you that allows you to access the Services from a mobile device and any other Materials (as defined below). By using the Services, you are agreeing to all of the Terms; if you do not agree with any of these Terms, do not access or otherwise use the Services.
                        </Text>
                            <Text style={{ fontSize: 12 }}>
                                Important Note: These Terms contain a dispute resolution and arbitration provision, including class action waiver, which affects your rights under these Terms and with respect to any dispute you may have with Raajneeti. You may opt out of the binding individual arbitration and class action waiver as provided below.
                        </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                General Use
                        </Text>
                            <Text style={{ fontSize: 12 }}>The Services may not be available in all locations, and we may block access to the Services from certain locations based on your device's geolocation information. We may add to or remove the areas in which the Services are not available at any time, without notice to you.
                        </Text>
                            <Text style={{ fontSize: 12 }}>
                                By using, you represent, acknowledge and agree that you are at least 16 years of age. If you are not at least 16 years old, you may not use the Services at any time or in any manner or submit any information to the App, the Site or any part of the Services.
                        </Text>
                            <Text style={{ fontSize: 12 }}>
                                We may, in our sole discretion, refuse to offer the Services to any person or entity. We may, without notice and in our sole discretion, terminate your right to use the Services, or any portion thereof, and block or prevent your future access to and use of the Services or any portion thereof.
                       </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Services
                        </Text>
                            <Text style={{ fontSize: 12 }}>Raajneeti provides content through the Services that is copyrighted and/or trademarked work of third-party licensors and suppliers or other users of the Services (collectively, the "Materials"). Materials may include logos, text graphics, video, images, photos, software and other content.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Subject to these Terms, Raajneeti hereby grants you a limited, non-exclusive, non-sub-licensable, non-transferable and revocable license to use and to display the Materials and to use the Services solely for your personal, non-commercial use. Except for the foregoing license, you have no other rights in the Services or any Materials and you may not modify, edit, copy, reproduce, create derivative works of, reverse engineer, alter, enhance or in any way exploit any of the Services or Materials in any manner.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                You may use the App for your personal, non-commercial use. You may not: (i) modify, disassemble, decompile or reverse engineer the App, except to the extent that such restriction is expressly prohibited by law; (ii) rent, lease, loan, resell, sublicense, distribute or otherwise transfer the App to any third-party or use the App to provide time sharing or similar services for any third-party; (iii) make any copies of the App; (iv) remove, circumvent, disable, damage or otherwise interfere with security-related features of the App, features that prevent or restrict use or copying of any content accessible through the App, or features that enforce limitations on use of the App; or (v) delete the copyright and other proprietary rights notices on the App. You acknowledge that Raajneeti may from time to time issue upgraded versions of the App, and may automatically electronically upgrade the version of the App that you are using on your mobile device. You consent to such automatic upgrading on your mobile device, and agree that these Terms will apply to all such upgrades. Standard carrier data charges may apply to your use of the App.
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Account Security
                        </Text>
                            <Text style={{ fontSize: 12 }}>
                                We may ask for your mobile number in order to verify your account when you try to post content or if we suspect improper activity on your account. Please note that your carrier's text messaging and data fees apply for mobile number verification.
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Privacy
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Please review the Raajneeti Privacy Policy (the "Privacy Policy"), available at http://raajneeti.in/privacy which explains how we use and disclose information that we collect from and about you. By using our Services, you agree that we may use and disclose the information we collect from and about you as stated in the Privacy Policy (which is incorporated into these Terms). Without limiting the foregoing, you expressly acknowledge that any Submissions (defined below) or other information you submit to the Services may be viewable by all other users of the Services and any third party.
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Terms of Usage
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                When using the App and/or any other part of the Services, you agree not to:
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Defame, abuse, harass, stalk, threaten, or otherwise violate the legal rights (such as rights of privacy and publicity) of others.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Use racially or ethnically offensive language.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Discuss or incite illegal activity.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Post anything that exploits children or minors (including pornography that depicts minors) or that depicts cruelty to animals.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Post any copyrighted or trademarked materials without the express permission from the owner.
                           </Text>
                            <Text style={{ fontSize: 12 }}>
                                Disseminate any unsolicited or unauthorized advertising, promotional materials, 'junk mail', 'spam', 'chain letters', 'pyramid schemes', or any other form of such solicitation.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Use any robot, spider, scraper or other automated means to access the Services.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Take any action that imposes an unreasonable or disproportionately large load on our infrastructure.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Alter the opinions or comments posted by others on the Services
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Post any image or language that is obscene or offensive, threatening or demeaning to any individual or group.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Post anything contrary to our public image, goodwill or reputation.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                This list of prohibitions provides examples and is not exhaustive or exclusive. Raajneeti reserves the right to (a) terminate access to your account and your ability to post to the Services (or otherwise use the Services) and/or (b) refuse, delete or remove any Submissions; with or without cause and with or without notice, for any reason or no reason, or for any action that Raajneeti determines is inappropriate or disruptive to the Services or to any other user of the Services. Raajneeti may report to law enforcement authorities any actions that may be illegal, and any reports it receives of such conduct. When legally required or at Raajneeti's discretion, Raajneeti will cooperate with law enforcement agencies in any investigation of alleged illegal activity on the Services or on the Internet.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Unauthorized use of any Materials or Third-Party Content contained in the Services may violate certain laws and regulations. You agree to indemnify and hold Raajneeti and its officers, directors, employees, consultants, affiliates, agents, licensors, and business partners (collectively, the "Indemnified Entities") harmless from and against any and all costs, damages, liabilities, and expenses (including attorneys' fees and costs of defense) Raajneet or any other Indemnified Entity suffers in relation to, arising from, or for the purpose of avoiding, any claim or demand from a third party that your use of the Services or the use of the Services by any person using your user name and/or password (including without limitation, your participation in the posting areas or, your Submissions) violates any applicable law or regulation, or the copyrights, trademark rights or other rights of any third party.
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Disclaimer of Warranties
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Your use of the Services is at your own risk. The Materials may not have been verified or authenticated in whole or in part by Raajneeti, and they may include inaccuracies or typographical or other errors. Raajneeti does not warrant the accuracy of timeliness of the Materials contained on the Services. Raajneeti has no liability for any loss of, or errors or omissions in Submissions, or for any errors or omissions in the Materials or any other portion of the Services, whether provided by Raajneeti, our licensors or suppliers or other users.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Raajneeti, for itself and its licensors, makes no express, implied or statutory representations, warranties, or guarantees in connection with the services or any materials relating to the quality, suitability, truth, accuracy or completeness of any information or material contained or presented on the services. unless otherwise explicitly stated, to the maximum extent permitted by applicable law, the services, materials and any other portion of the services or any information or material contained or presented on the services is provided to you on an "as is," "as available" basis with no warranty of implied warranty of merchantability, fitness for a particular purpose, or non-infringement of third party rights. without limiting the foregoing, Raajneeti does not provide any warranties against viruses, spyware or malware that may be installed on your computer.
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Copyright Policy
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Raajneeti respects the intellectual property rights of others. If you believe that your intellectual property appears on the Services in violation of your copyright, please provide Raajneeti's designated agent the following information:
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Identification of the work claimed to have been infringed, or, if multiple works at a single online site are covered by a single notification, a representative list of such works at that site.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled at the Services, and information reasonably sufficient to permit Raajneeti to locate the material.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Information reasonably sufficient to permit Raajneeti to contact you as the complaining party, such as an address, telephone number, and, if available, an electronic mail address at which you may be contacted.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the intellectual property owner, its agent, or the law.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                For more information, please visit www.raajneeti.in
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
                                Raajneeti Privacy Policy
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                EFFECTIVE DATE: March 6, 2019
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                The Raajneeti mobile application and services, as well as Raajneeti websites and services (the "Sites") and any content therein (collectively, the "Services") offer users a forum to interact with other Raajneeti users in the same area, in order to post and share comments, and to respond to comments posted by others.  In this Privacy Policy ("Policy"), we describe how we collect, use, and disclose information that we obtain about users of our Services, which are available via mobile applications (the "App") and/or the Sites.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                What Information We Collect
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                We may also collect the folloswing information:
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Device Phonebook. We may, with your consent, collect information from your device's phonebook. We do this so that you can share Raajneeti with your phonebook contacts. You can always revoke this consent by changing the settings on your device.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Geolocation Data. We ask you to share your location information from your mobile device and/or computer. If you choose not to, the Services will not function. Location information is used to place you in your local Raajneeti group, to place you in your home Raajneeti group, and as explained below. You can revoke your consent by changing the settings or preferences on your device and/or computer or by deleting Raajneeti from your device.  If you do not want Raajneeti to use location information from your computer, you should also clear your browser history (where location information is stored).
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Your Content and Usage. We collect any content you submit to the Services. The content includes anything in or attached to your Raajneeti (for example, photos and links), replies and votes, as well as information about when you submitted the content, when it was viewed, and other activities.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Phone Number. We ask you to provide and verify your mobile number. This process is triggered, when you register yourself so that  we  can confirm using OTP sent to  your number. We DO NOT  use this number for any other purpose. We DO NOT share your number with any other party for sales purpose.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Other Information you Provide to Us. When you contact or otherwise communicate with Raajneeti, we will collect any information you volunteer.
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Information We Collect Automatically. We may automatically collect information about your use of the Services such as: access time, device ID, application ID or other unique identifier; domain name, IP address, screen views; geo-location data (with your permission); language information; device name and model; operating system information; your activities within the Services; and the length of time that you are logged in. We may combine this information with other information that we have collected about you.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                How We Use Information We Collect
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                In general, we use the information we collect from and about you to provide and operate the Services, respond to your requests, and to provide customer service and technical support. We may also use information:
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                To place you in your local Raajneeti group so that you can post and review content based on your current location.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                To tag your post with city-level location information.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                To place you in your home Raajneeti group so that you can post and review content in your community even when you are away.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                To tailor the information that we may send or display to you, offer location customization, send you push notifications and alerts, and to otherwise personalize your experiences while using our Services.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                To send you notices.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                To display advertising, including advertising that is targeted to you based on your location, as well as your Raajneeti activities.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Verify your identity and prevent spam or other unauthorized or illegal activity.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                To better understand how users access and use our Services, both on an aggregated and individualized basis, in order to improve our Services and respond to user desires and preferences, and for other research and analytical purposes.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                How We Share Information
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                You cannot control who views your content; any content you post is publicly available. So, if you don't want to share something publicly, don't post it. Raajneeti is a social network, and the content you post may be shared with and viewable by others. We do not identify you by name or contact information to other Raajneeti users. However, we cannot prevent others from determining your identity from the content you post or how you share content through third party sites.
                               </Text>
                            <Text style={{ fontSize: 12 }}>
                                The information we collect, including personally identifiable information, may be shared as follows:
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Raajneeti Users. Any information that you post, including comments, replies and other information is publicly available. We cannot control how your information is used by others. Your posts are available to all other users. Users can also freely share any Raajneeti content, no matter who posted it, through other third party sites like Facebook, Twitter and Instagram. And, your posts may be publicly distributed outside of Raajneeti by us or third parties.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Service Providers. We may disclose the information we collect to third party vendors, service providers, contractors or agents who perform functions on our behalf.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Business Transfers. We may transfer the information we have collected to another company in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Third Parties and Partners. We may share the information with our third party partners, including advertisers and researchers. For example, if you post content that mentions one of our advertisers, we may share that content with them. Or, we may work with a researcher to analyze the content on a particular feed.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                In Response to Legal Process. We also may disclose the information in order to comply with the law, a judicial proceeding, court order, subpoena, or other legal process. For example, we may share your IP address or other identifier, your location information, or any other information we have collected about you and your device.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                To Protect Us and Others. We also may disclose information if we believe it is necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the safety of any person, violations of our Terms of Service or this Policy, or as evidence in litigation in which Raajneeti  is involved.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Aggregate and De-Identified Information. We may also share aggregate or de-identified information about users with third parties for marketing, advertising, research or similar purposes.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Invite Contacts
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                You can choose to "Share Raajneeti " by inviting contacts via email, text or other means. You choose what contacts to invite and when to invite them. If you invite a contact, we will generate a message with the Raajneeti download URL included, which you can choose to send via your mobile device.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Your Content
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                You can delete content you have posted (including replies). Content you delete will be hidden from other users. However, Raajneeti may maintain a copy of such content in our records.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Push Notifications/Alerts
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                We may send push notifications or alerts to your device. You can deactivate these messages at any time by changing the notification settings on your device or by changing your Raajneeti settings.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Cookies
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                "Cookies" are small data file identifiers that are transferred to your computer that allow us to recognize your browser and transfer information about you and your use of our Services. For example, cookies that we use tell us how many times you have visited one of our Sites. We use "persistent" cookies to save your login information for future logins to the Services. We also use "session ID" cookies to enable certain features of the Services, to better understand how you interact with the Services and to monitor aggregate usage by users and web traffic routing on the Services. Unlike persistent cookies, session ID cookies are deleted from your computer when you log off from a Service and close your browser. You can instruct your browser, by changing its settings, to stop accepting cookies or to prompt you before accepting a cookie from our Sites. If you do not accept cookies, you may not be able to use all portions of the Services or all functionality of the Services.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Third Party Analytics
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                We may use automated devices and applications, included those offered by third parties to evaluate usage of our Services. We also may use other analytic means to evaluate our Services. We use these tools to help us improve our Services, performance and user experiences. The information collected may include unique device identifiers, device manufacturer and operating system, IP address, browser type, session start/stop time, and user activity.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                From within the App, you may opt out of the collection of this information by third party analytics companies for the App (but not for the Sites) by setting the toggle at the end of the Policy to the right. The opt-out is not available on the Sites.Please note that if you choose to opt out of any data collection, that opt-out will not result in the deletion of data that has already been collected from the App.
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                To learn how Google Analytics uses your data from the Sites and how to opt out of collection of your information by Google Analytics via the Sites please visit http://www.google.com/analytics/learn/privacy.html and https://tools.google.com/dlpage/gaoptout.  To learn how Optimizely uses your data from the Sites and how to opt out, please visit https://www.optimizely.com/privacy/ and https://www.optimizely.com/opt_out/.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Third Party Ads
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                We may display ads to you (including in-app ads), and we may target those ads based on your location, your Raajneeti activities, and other criteria (e.g., the time of day). We do not currently respond to do-not-track signals that may be sent from your device. For more information about interest-based ads, including how to opt out of having your web browsing information used for behavioral advertising purposes, please visit http://www.aboutads.info/choices.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Third-Party Links
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                Our Services may contain links to third-party websites. Any access to and use of such linked websites is not governed by this Policy, but instead is governed by the privacy policies of those third party websites.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Minors
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                You must be at least 16 to use our Services. If you are not at least 16, please do not use our Services or provide any information to us. If we discover that a child under 13 has provided us with personal information, we will delete such information from our systems.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Contact Us
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                If you have questions about the privacy aspects of our Services or would like to make a complaint, please contact us at http://www.raajneeti.in/.
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                                Changes to this Policy
                                </Text>
                            <Text style={{ fontSize: 12 }}>
                                This Policy is current as of the Effective Date set forth above. We may change this Policy from time to time, so please be sure to check back periodically. We will post any changes to this Policy at http://Raajneeti.in/privacy. If we make any changes to this Policy that materially affect our practices with regard to the personal information we have previously collected from you, we will endeavor to provide you with notice in advance of such change by highlighting the change on our Site, or providing notice in our mobile app.
</Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView >
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

});
