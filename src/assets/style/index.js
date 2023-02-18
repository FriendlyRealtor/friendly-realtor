import {StyleSheet, Dimensions} from 'react-native';
import { color } from './color';
const {width, height} =  Dimensions.get('window');
export const AppStyle = {
    color: color,
    style: StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F9F9F9',
            paddingHorizontal: width * 0.05,
            paddingVertical: width * 0.05,
        },
        backgroundColor: {backgroundColor: '#F9E0AE'},
        middle: {
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
        },
        h1: {
            fontSize: width * 0.1 < 50? 50 : width * 0.1,
            fontWeight: 'bold'
        },  
        h2: {
            fontSize: width * 0.08 < 30? 30 : width * 0.08,
            fontWeight: 'bold'
        },  
        h3:{
            fontSize: width * 0.06 < 25 ? 25 : width * 0.06,
            fontWeight: 'bold'
        },
        h4:{
            fontSize: width * 0.04 < 20 ? 20 : width * 0.04,
            fontWeight: 'bold'
        },
        h5:{
            fontSize: width * 0.03 < 15 ? 15 : width * 0.03,
        },
        p: {
            fontSize: width * 0.0295 < 14? 14 : width * 0.0295
        },
        inputContainer: {borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#97979750"},
        input: { height: width * 0.08, color: color.gray},
        groupContainer: {
            backgroundColor: color.white,
            elevation: 8,
            shadowColor: color.black,
            shadowOffset: {width: 3, height: 1},
            shadowOpacity: 0.05,
            padding: width * 0.03,
            borderRadius: 8
        },
        imageContainer: {width: '100%', backgroundColor: color.black, borderRadius: 8, overflow: 'hidden', marginBottom: width * 0.05},
        imageContentContainer: {backgroundColor: '#682C0E50', paddingHorizontal: width * 0.05, height: width * 0.35, justifyContent: 'center', alignItems: 'flex-start'},
        bottomTab:  {backgroundColor: "white", height: 70, position: "absolute",marginHorizontal: 25, marginBottom: 25, paddingTop: 15, borderRadius: 40, overflow: "hidden", borderTopWidth: 1, borderWidth: 1, borderTopColor: "#C4C4C450", borderColor: "#C4C4C450"},
        tabBar: {backgroundColor: "rgba(0,0,0,0)", height: 65, alignItems: "center", bottom: 15},
        tabBarIcons: {width: width * 0.06 > 25? 25 : width * 0.06 , height: width * 0.06 > 25? 25 : width * 0.06, resizeMode: "contain"}, 
        headerButton: {width: width * 0.06, height: width * 0.06, justifyContent: 'center', alignItems: 'center'},
        iconHeaderButton: {width: width * 0.045, height: width * 0.045, resizeMode: 'contain', alignSelf: "center"},
        contentMiddle: {justifyContent: "center", alignItems: "center", alignContent: "center"},
        nonePadding: {padding: 0, paddingVertical: 0, paddingHorizontal: 0},
        nonePaddingTop: {paddingTop: 0},
        nonePaddingLeft: {paddingLeft: 0},
        nonePaddingRight: {paddingRight: 0},
        nonePaddingBottom: {paddingBottom: 0},
        noneMarginBottom: {marginBottom: 0},
        noneMarginTop: {marginTop: 0},
        noneMarginLeft: {marginLeft: 0},
        noneMarginRight: {marginRight: 0},
        noneMargin: {margin: 0, marginVertical: 0, marginHorizontal: 0},
        smallMargin: {margin: width * 0.015},
        smallMarginVertical: {marginVertical: width * 0.015},
        smallMarginHorizontal: {marginHorizontal: width * 0.015},
        smallMarginTop: {marginTop: width * 0.015},
        smallMarginBottom: {marginBottom: width * 0.015},
        smallMarginLeft: {marginLeft: width * 0.015},
        smallMarginRight: {marginRight: width * 0.015},
        margin: {margin: width * 0.03},
        marginLarge: {margin: width * 0.05},
        marginHorizontal: {marginHorizontal: width * 0.03},
        marginHorizontalLarge: {marginHorizontal: width * 0.05},
        marginVertical: {marginVertical: width * 0.03},
        marginVerticalLarge: {marginVertical: width * 0.05},
        marginTop: {marginTop: width * 0.03},
        marginTopLarge: {marginTop: width * 0.05},
        marginBottom: {marginBottom: width * 0.03},
        marginBottomLarge: {marginBottom: width * 0.05},
        marginLeft: {marginLeft: width * 0.03},
        marginLeftLarge: {marginLeft: width * 0.05},
        marginRight: {marginRight: width * 0.03},
        marginRightLarge: {marginRight: width * 0.05},
        paddingLarge: {padding: width * 0.05},
        padding: {padding: width * 0.03},
        paddingHorizontal: {paddingHorizontal: width * 0.03},
        paddingHorizontalLarge: {paddingHorizontal: width * 0.05},
        paddingVertical: {paddingVertical: width * 0.03},
        paddingVerticalLarge: {paddingVertical: width * 0.05},
        paddingTop: {paddingTop: width * 0.03},
        paddingTopLarge: {paddingTop: width * 0.05},
        paddingBottom: {paddingBottom: width * 0.03},
        paddingBottomLarge: {paddingBottom: width * 0.05},
        smallPadding: {padding: width * 0.015},
        smallPaddingVeritcal: {paddingVertical: width * 0.015},
        smallPaddingHorizontal: {paddingHorizontal: width * 0.015},
        smallPaddingTop: {paddingTop: width * 0.015},
        smallPaddingBottom: {paddingBottom: width * 0.015},
        smallPaddingLeft: {paddingLeft: width * 0.015},
        smallPaddingRight: {paddingRight: width * 0.015},
        //
        imageEmpty: {width: width * 0.3, height: width * 0.3, resizeMode: "contain", alignSelf: "center", marginBottom: width * 0.05},
        imageEmptyLarge: {width: width * 0.7, height: width * 0.7, resizeMode: "contain", alignSelf: "center"}
    })
}