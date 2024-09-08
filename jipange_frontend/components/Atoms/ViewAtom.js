import { View } from 'react-native';
 const ViewAtom=(props)=>{
    const {fd,w,jc,ai,pv,ph,bg,br,mv,mh,fw,op,el,sh,h,mr,as}=props

    return(
        <View  
         style={{
        alignItems: ai,
        display:"flex",
        width:w,
        flexDirection:fd,
        justifyContent: jc,
        paddingVertical:pv,
        paddingHorizontal:ph,
        backgroundColor:bg,
        borderRadius:br,
        marginVertical:mv,
        marginHorizontal:mh,
        flexWrap:fw,
        opacity:op,
        elevation:el,
        shadowColor:sh,
        height:h,
        marginRight:mr,
          alignSelf:as
        }}>
      {props.children}
      </View>
   

    )
}
export default ViewAtom