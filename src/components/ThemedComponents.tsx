/**
 * Components imported by 'react' and 'react-native'
 */
 import React, { useState, Ref, useRef, useEffect } from 'react';
 import {
  Alert,
  Platform,
  useWindowDimensions,
  StyleProp,
  StyleSheet,
  View,  
  Animated,
  ScrollView,
  SafeAreaView as DefaultView, 
  ViewProps as DefaultViewProps,
  Image as DefaultImage, 
  ImageProps as DefaultImageProps, 
  TouchableOpacity,
  //CheckBox, CheckBoxProps,
  Text, 
  TextProps as DefaultTextProps,
  TextInput,
  TextInputProps,
  FlatList,
  FlatListProps,
  Pressable, 
  PressableProps as DefaultButtonProps
} from 'react-native';
import { CheckBox, Icon, CheckBoxProps } from 'react-native-elements';
//import {Table, TableProps, Row, RowProps, Rows, RowsProps} from 'react-native-table-component';

/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import Colors from '../config/colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function confirm(content, yesCallback, noCallback) {
  return Alert.alert(
    "Confirm",
    content,
    [
      {
        text: "Yes",
        onPress: () => {
          yesCallback();
        },
      },
      {
        text: "No",
        onPress: () => {
          noCallback();
        },
      },
    ]
  )
}

type ThemeProps = {
  Id?: string;
  refInput?: Ref<any>;
  lightColor?: string;
  darkColor?: string;
  Align?: string;
  VAlign?: string;
  Column?: string;
  Font?: string;
  Text?: string;
  MaxLength?: string;
  Enable?: string;
  Readonly?: string;
  TabOrder?: string;
  UpperOnly?: string;
  Visible?: string;
  Border?: string;
  BorderColor?: string;
  BottomMargin?: string;
  BKColor?: string;
  LineColor?: string;
  Color?: string;
  DisableColor?: string;
  DecimalLen?: string;
  Height?: string;
  Width?: string; 
  Left?: string;
  Right?: string;
  Top?: string;
  Bottom?: string;
  LeftMargin?: string;
  RightMargin?: string;
  RoundHeight?: string;
  RoundWidth?: string;
  Transparent?: string;
  Type?: string;
  InputPanel?: string;
  DomainID?: string;
  ButtonStyle?: string;
  Face3dColor?: string;
  isChecked?: string;
};

type PickerProps = {
  data: Map<string, any>[], 
  CodeColumn: string, 
  DataColumn: string,
  selectedValue: any,
  isChecked?: boolean,
  OnChanged?: any;
  children?: any;
}

type StyleProps = {
  style?: StyleProp<StyleSheet>;
};

/**
 * Components imported by '@react-native-elements/base'
 */

type ViewProps = ThemeProps & DefaultViewProps;
type ShapeProps = ThemeProps & DefaultViewProps;
type ButtonProps = ThemeProps & DefaultButtonProps & TextInputProps;
type StaticProps = ThemeProps & DefaultTextProps & {text?: string};
type ImageProps = ThemeProps & DefaultImageProps;
type ComboProps = ThemeProps & PickerProps & StyleProps;
type CheckboxProps = ThemeProps & CheckBoxProps;
type EditProps = ThemeProps & TextInputProps;
type ListProps = ThemeProps & FlatListProps<any>;
//type GridProps = ThemeProps & TableProps;
type GridBodyProps = ThemeProps & FlatListProps<any>;
//type GridRowProps = ThemeProps & RowProps;
type GridCellProps = CheckboxProps & StaticProps & {color?: string, align?: string, bkcolor?: string, col?: string, font?: string, text?: string, width?: string};

function Form(props: ViewProps) {
  const { Id, style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const { width, height } = useWindowDimensions();
  const SCALE = Math.min(width, 360)/FORM_WIDTH;
  const FORM_TOP = (SCALE - 1)*FORM_HEIGHT/2-20;

  let retElement = (
    <Animated.View style={styles.body}>
      <Animated.View style={[{ backgroundColor, transform: [{scale: SCALE}], marginTop: FORM_TOP, }, styles.form, style]} {...otherProps}/>
    </Animated.View>
  )
  
  return retElement;
}

function Header(props: ViewProps) {
  const { Id, style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor}, 'text');
  let retElement = (
    <Animated.View style={[styles.headerView]}>
      <Text style={[{ color }, styles.headerFont]} {...otherProps} />
      <Shape style={styles.headerLine} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </Animated.View>
  )
  return retElement;
}

function Shape(props: ShapeProps) {
  const { Id, style, lightColor, darkColor, ...otherProps } = props;
  let newStyle = getStyle(style, props);

  let retElement = (
    <>
    <DefaultView style={[styles.shape, newStyle]} {...otherProps} ></DefaultView>
    </>
  )
  
  return retElement;
}

function Static(props: StaticProps) {
  const { Id, refInput, style, lightColor, darkColor, children, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const styleContainer = {backgroundColor: props.BKColor, borderColor: props.LineColor};
  let newStyle = getStyle(style, props);
  let newChild = children || (!!props.Text ? props.Text : '') || (!!props.text ? props.text : '');

  let retElement = (
    <DefaultView style={styleContainer}>
      <Text ref={refInput} style={[{ color }, styles.static, newStyle, ]} {...otherProps} >{newChild}</Text>
    </DefaultView>
  );

  return retElement;
}

function Edit(props: EditProps) {
  const { Id, refInput, style, lightColor, darkColor, onFocus, onKeyPress, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  let newStyle = getStyle(style, props);
  if(Platform.OS == "android") {
    newStyle['paddingTop'] = -9;
    newStyle['paddingBottom'] = 0;
  }

  if(!otherProps.autoCapitalize && !!otherProps.UpperOnly && otherProps.UpperOnly.toLowerCase()=="true") {
    otherProps.autoCapitalize = "characters";
  }
  if(!otherProps.editable && !!otherProps.Readonly && otherProps.Readonly.toLowerCase()=="true") {
    otherProps.editable = false;
  }

  let retElement = (
    <TextInput ref={refInput} style={[{ color }, styles.input, otherProps.editable? {} :styles.disbledBorder, newStyle]} 
      onFocus={onFocus} 
      onKeyPress={onKeyPress}
      keyboardAppearance="light"
      autoCorrect={false}
      multiline={false}
      returnKeyType="next"
      {...otherProps} />
  );  
  return retElement;
}

function Combo(props: ComboProps) {
  const { Id, refInput, style, lightColor, darkColor, data,
          OnChanged, selectedValue, ...otherProps } = props;

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  let newStyle = getStyle(style, props);
  
  const [visible, setVisible] = useState(false);
  const [selectedItem, selectItem] = useState({});

  selectedItem['value'] = selectedValue;
  selectedItem['index'] = data.findIndex((item) => {return item == selectedValue;});
  selectedItem['data' ] = selectedItem['index'] == -1 ? "" : data[selectedItem['index']];

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const touchItem = (value, index) => {
    selectItem({value: value, index: index, data: data[index]});
    !!OnChanged && OnChanged(value, index);
  };
  
  let retElement = 
    (visible) ?
    (
    <TouchableOpacity
      ref={refInput}
      style={[styles.combo, {backgroundColor}, newStyle, {flexDirection: 'column', height: (18*data.length), overflowY: 'auto'}]}>
      {
      data.map((item: Map<string, string>, index) => {
        return (
          <Text key={Id+index} 
              onPress={(e) => { toggleDropdown(); touchItem(item.get('value'), index); }}
              style={[styles.comboItem, {backgroundColor}, 
                        {width: newStyle.width-2}]}>
            {item.get('data')}
          </Text>
        );
      })
     }
    </TouchableOpacity>
    )
    :
    (
    <TouchableOpacity
      ref={refInput}
      style={[styles.combo, {backgroundColor}, newStyle, {flexDirection: 'row', overflowY: 'hidden'}]}>
        <Text style={[styles.comboText, {width: newStyle.width-15}]}
          onPress={(e) => toggleDropdown()}>{selectedItem['data']}</Text>
        <Text style={[styles.comboText, {width: 12, fontSize:10, paddingRight: 1}]}
          onPress={(e) => toggleDropdown()}>{visible? '▲' : '▼'}</Text>
    </TouchableOpacity>
    );
  return retElement;
}

function Checkbox(props: CheckboxProps) {
  const { Id, refInput, style, lightColor, darkColor, onPress, isChecked, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  let newStyle = getStyle(style, props);
  //const [isChecked, setIsChecked] = useState(!!isChecked);

  const click = (evt) => {
    //setIsChecked(!isChecked);
    onPress && onPress(evt);
  }
  
  let retElement = (
      <View style={[styles.checkboxContainer, newStyle, ]} >
        <Text style={[{ color }, styles.static]}>{props.Text}</Text>
        <CheckBox style={[styles.checkbox, {paddingLeft: 11*(!props.Text? 0 : props.Text.length), marginTop:-2}]} 
                  ref={refInput} 
                  disabled={false} 
                  onClick={click}
                  isChecked={isChecked}
                  isRequired={{}}
                  tintColors={{true: "#007aff", false: "#ccc"}} onCheckColor="#007aff" />
      </View>
  ); 
  return retElement;
}
/*
function Grid(props: GridProps) {
  const { Id, refInput, style, lightColor, darkColor, headData, data, widthArr, children, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  let newStyle = getStyle(style, props);
  let bodyChildren;

  if(!!data) {
    bodyChildren = (
      <Table borderStyle={{borderWidth: 1, borderColor: '#aaa', borderTop: 'none', borderRight: 'none'}}>
      {!!data && data.map((rowData, index) => (
        <Row 
          key={Id + "_"+index}
          data={rowData}
          widthArr={widthArr}
          style={{maxHeight: 18, textAlign: 'center'}}
          textStyle={{fontSize: 10, paddingLeft: 3, overflow: 'hidden'}}
          borderStyle={{borderWidth: 0.5, borderColor: '#aaa'}}
        />
      ))}
      </Table>
    );
  } else {
    bodyChildren = children;
  }

  let retElement = (
    <View style={[styles.grid, newStyle, ]}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: '#118bff'}}>
            <Row key={Id + "_Head"} OnHeadDBClick
                style={{maxHeight: 18, backgroundColor: 'rgb(208, 224, 231)', textAlign: 'center', }} 
                textStyle={!!headData ? {fontSize: 10, lineHeight: 13, paddingLeft: 3, overflow: 'hidden', alignSelf: 'center'} : null} 
                data={headData} 
                widthArr={widthArr} 
            />
          </Table>
          <View style={styles.gridBody}>
            {bodyChildren}
          </View>
        </View>
      </ScrollView>
    </View>
  );
  
  return retElement;
}

function GridBody(props: GridBodyProps) {
  const { Id, lightColor, darkColor, style, data, renderItem, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  let newStyle = getStyle(props.style, props);

  return (
      <FlatList
        data={data}
        keyExtractor={(a: Object, index: number) => index.toString()}
        renderItem={renderItem}
        style={[styles.gridBody, newStyle]}
        {...otherProps}
      />
  );
}

function GridRow(props: GridRowProps) {
  const { style, lightColor, darkColor, OnClick, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text'); 

  return (
    <Pressable style={styles.gridRow} onPress= {OnClick} {...otherProps} />
  );
};

function GridCell(props: GridCellProps) {  
  const { Id, style, lightColor, darkColor, OnClick, children, value, ...otherProps } = props;
  let newChild = children || (!!props.text ? props.text : !!props.Text ? props.Text : '');
  let newStyle = getStyle(props.style, props);
  let retElement;

  if(props.display == "checkbox") {    
    retElement = (
      <Checkbox style={[styles.gridCell, styles.gridRowBorder, newStyle, {minWidth: newStyle.width}]} 
          isChecked={!!value} {...otherProps} />
    );
  } else {
    retElement = (
      <Text style={[styles.gridCell, styles.gridRowBorder, newStyle, {minWidth: newStyle.width}]} onPress= {OnClick} {...otherProps}>
        {newChild}
      </Text>
    );
  }
  return retElement;
};
*/
/**
 * exported by Themed
 */
 export type {
  ViewProps,
  ShapeProps,
  StaticProps,
  ImageProps,
  ButtonProps,
  ComboProps,
  CheckboxProps,
  EditProps,
  ListProps,
  //GridProps,
  GridBodyProps,
  //GridRowProps,
  GridCellProps,
};

export {
  Form,
  Header,
  Shape,
  Static,
  Edit,
  Combo,
  Checkbox,
  //Grid,
  //GridBody,
  //GridRow,
  //GridCell,
};

function getStyle(orgStyle, props) {
  
  type propsType = typeof props;
  let style : typeof props = !!orgStyle ? props.style : StyleSheet.create({});

  if(style.top == undefined && !!props.Top) style.top = +props.Top.replace('px','');
  if(style.left == undefined && !!props.Left) style.left = +props.Left.replace('px','');
  if(style.height == undefined && !!props.Height) style.height = +props.Height.replace('px','');
  if(style.height == undefined && !!props.height) style.height = +props.height.replace('px','');
  if(style.width == undefined && !!props.Width) style.width = +props.Width.replace('px','');
  if(style.width == undefined && !!props.width) style.width = +props.width.replace('px','');
  if(style.maxWidth == undefined && !!props.width) style.maxWidth = +props.width.replace('px','');
  if(style.marginLeft == undefined && !!props.LeftMargin) style.marginLeft = +props.LeftMargin.replace('px','');
  if(style.marginRight == undefined && !!props.RightMargin) style.marginRight = +props.RightMargin.replace('px','');
  if(style.marginTop == undefined && !!props.TopMargin) style.marginTop = +props.TopMargin.replace('px','');
  if(style.marginBottom == undefined && !!props.BottomMargin) style.marginBottom = +props.BottomMargin.replace('px','');
  if(style.color == undefined && !!props.Color) style.color = props.Color.toLowerCase();
  if(style.backgroundColor == undefined && !!props.BKColor) style.backgroundColor = props.BKColor.toLowerCase();
  if(style.borderWidth == undefined && !!props.Border && props.Border.toLowerCase() === "flat") style.borderWidth = 1;
  if(style.borderWidth == undefined && !!props.Border && props.Border.toLowerCase() === "none") style.borderWidth = 0;
  if(style.borderColor == undefined && !!props.BorderColor) style.borderColor = props.BorderColor.toLowerCase();
  if(style.borderColor == undefined && !!props.LineColor) style.borderColor = props.LineColor.toLowerCase();
  if(style.textAlign == undefined && !!props.Align) style.textAlign = props.Align.toLowerCase();
  if(style.textAlignVertical == undefined && !!props.VAlign) style.textAlignVertical = props.VAlign.toLowerCase().replace('middle','center');
  if(style.fontSize == undefined && !!props.Font) style.fontSize = +props.Font.split(',')[1].replace('px','');
  if(style.fontWeight == undefined && !!props.Font && props.Font.split(',')[2].toLowerCase() == "bold") style.fontWeight = props.Font.split(',')[2].toLowerCase();
  if(style.borderRadius == undefined && !!props.RoundWidth) style.borderRadius = +props.RoundWidth.replace('px','');
  if(style.borderRadius == undefined && !!props.RoundHeight) style.borderRadius = +props.RoundHeight.replace('px','');
  if(style.textTransform == undefined && !!props.UpperOnly) style.textTransform = "uppercase";
  if(style.opacity == undefined && !!props.Visible && props.Visible.toLowerCase()=="false") style.opacity = 0;
  if(style.backgroundColor == undefined && !!props.Transparent && props.Transparent.toLowerCase()=="true") style.backgroundColor = 'transparent';

  return style;
}

const FORM_WIDTH = 240;
const FORM_HEIGHT = 260;

const styles = StyleSheet.create({
  headerView : {
    width: '100%', 
    height: '10%',
    justifyContent: 'center', 
    marginLeft: '5%', 
    marginRight:'5%',
  },
  headerLine : {
    width: '100%', 
    height: '1',
    marginVertical: 12,
  },
  headerFont : {
    fontSize: 14, 
    fontWeight: 'bold',
  },
  body : {
    width: '100%',
    height: '100%', 
    padding: 0, 
    margin: 0,
  },
  form : {
    width: FORM_WIDTH,
    height: FORM_HEIGHT,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  static : {
    position: 'absolute', 
    fontSize: 10, 
    fontWeight: 'bold',
    textAlignVertical: 'center',
    padding: 0,
    margin: 0,
  },
  input: {
    position: 'absolute', 
    fontSize: 10,
    paddingHorizontal: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#333333',
    textAlignVertical: 'center',
  },
  disbledBorder: {
    borderColor: '#aaaaaa',
  },
  button: {
    position: 'absolute',
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'normal',
    textAlign: 'center',
    letterSpacing: 0.25,
    textTransform: 'uppercase',
    backgroundColor:'#777777',
    borderRadius: 3,
    elevation: 3,
    paddingBottom: 1,
  },
  image: {
    position: 'absolute',
  },
  checkboxContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignItems: 'stretch',
  },
  checkbox: {
  },
  combo: {
    position: 'absolute',
    minWidth: 30,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#abbdce',
  },
  comboText: {
    fontSize: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  comboItem: {
    fontSize: 10,
    lineHeight: 14,
    paddingLeft: 3,
  },
  invisible: {
    opacity: 0,
    height: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
    height: '100%',
    width: '100%',
  },
  shape: {
    position: 'absolute',
  },
  messageBar: {
    position: 'absolute',
    top: FORM_HEIGHT-20,
    width: '100%',
    minHeight: 18,
    fontSize: 10,
    lineHeight: 18,
    backgroundColor: '#efefef', 
  },
  grid: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#333',
    justifyContent: 'center',
    overflow: 'scroll'
  },
  gridHead: {
    height: 20,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgb(208, 224, 231)',
    textAlign: 'center',
  },
  gridBody: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  gridRow: {
    flexDirection: 'row',
    maxHeight: 20,
    width: '100%',
  },
  gridCell: {
    fontSize: 10,
    overflow: 'hidden',
    position: 'relative',
    paddingLeft: 3,
    textAlignVertical: "center",
  },
  gridRowBorder: {
    borderWidth: 0.5, 
    borderColor: '#aaa',
  }
});