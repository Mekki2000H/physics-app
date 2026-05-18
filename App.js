import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
  ScrollView, StyleSheet, Animated, StatusBar, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const UNITS = [
  { id: 1, name: "المتابعة الزمنية",        emoji: "⏱", color: "#00f5ff" },
  { id: 2, name: "تطور جملة ميكانيكية",    emoji: "⚙",  color: "#00ff88" },
  { id: 3, name: "الظواهر الكهربائية",      emoji: "⚡", color: "#bf00ff" },
  { id: 4, name: "الأحماض والأسس",          emoji: "🧪", color: "#00f5ff" },
  { id: 5, name: "التحولات النووية",        emoji: "☢",  color: "#00ff88" },
  { id: 6, name: "الأسترة",                 emoji: "🔬", color: "#bf00ff" },
];

const SECTIONS = [
  { key: "lesson",    name: "الدرس",          icon: "▶", desc: "فيديو شرح مفصّل",          hasVideo: false },
  { key: "exercises", name: "تمارين الوحدة",  icon: "✎", desc: "تمارين محلولة خطوة بخطوة", hasVideo: true  },
  { key: "docs",      name: "وثائق الوحدة",   icon: "◈", desc: "ملفات PDF للتحميل",         hasVideo: false },
];

function SplashScreen({ onDone }) {
  const fade  = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6,    useNativeDriver: true }),
    ]).start();
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={s.splash}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Animated.View style={{ opacity: fade, transform: [{ scale }], alignItems: 'center' }}>
        <View style={s.logoBox}>
          <Text style={s.atomIcon}>⚛</Text>
        </View>
        <Text style={s.splashTitle}>مرحباً بك في أقوى تطبيق</Text>
        <Text style={s.splashSub}>فيزياء</Text>
      </Animated.View>
    </View>
  );
}

function CodeScreen({ onEnter }) {
  const [code, setCode] = useState('');
  return (
    <View style={s.codeScreen}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <View style={s.codeIconBox}><Text style={{ fontSize: 36 }}>🔐</Text></View>
      <Text style={s.codeTitle}>أدخل كود الوصول</Text>
      <Text style={s.codeSub}>الكود مكوّن من 8 أحرف وأرقام</Text>
      <TextInput
        style={s.codeInput}
        value={code}
        onChangeText={t => setCode(t.toUpperCase().slice(0, 8))}
        placeholder="XXXXXXXX"
        placeholderTextColor="#333"
        textAlign="center"
        autoCapitalize="characters"
      />
      <TouchableOpacity style={s.enterWrap} onPress={onEnter} activeOpacity={0.85}>
        <LinearGradient colors={['#00f5ff','#bf00ff']} start={{x:0,y:0}} end={{x:1,y:0}} style={s.enterBtn}>
          <Text style={s.enterTxt}>دخول ←</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ onSelect }) {
  return (
    <ScrollView style={s.home} contentContainerStyle={{ paddingBottom: 40 }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <View style={s.homeHeader}>
        <Text style={s.greeting}>أهلاً بك 👋</Text>
        <Text style={s.homeTitle}>الوحدات الدراسية</Text>
        <Text style={s.homeSub}>بكالوريا — فيزياء وكيمياء</Text>
      </View>
      <View style={s.grid}>
        {UNITS.map(u => (
          <TouchableOpacity key={u.id} style={[s.card, { borderColor: u.color + '55' }]} onPress={() => onSelect(u)} activeOpacity={0.8}>
            <View style={[s.cardIcon, { backgroundColor: u.color + '18', borderColor: u.color + '44' }]}>
              <Text style={{ fontSize: 28 }}>{u.emoji}</Text>
            </View>
            <Text style={[s.cardNum, { color: u.color }]}>الوحدة {u.id}</Text>
            <Text style={s.cardName}>{u.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function UnitScreen({ unit, onBack }) {
  return (
    <ScrollView style={s.unitScreen} contentContainerStyle={{ paddingBottom: 40 }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <View style={s.unitHeader}>
        <TouchableOpacity onPress={onBack} style={[s.backBtn, { backgroundColor: unit.color + '18' }]}>
          <Text style={[s.backTxt, { color: unit.color }]}>← العودة</Text>
        </TouchableOpacity>
        <Text style={[s.unitNumLabel, { color: unit.color }]}>الوحدة {unit.id}</Text>
        <Text style={s.unitTitle}>{unit.name}</Text>
      </View>
      <View style={s.sections}>
        {SECTIONS.map((sec, i) => (
          <View key={sec.key}>
            <TouchableOpacity style={[s.secCard, { borderColor: unit.color + '35' }]} activeOpacity={0.8}>
              <View style={[s.secIcon, { backgroundColor: unit.color + '15', borderColor: unit.color + '35' }]}>
                <Text style={{ color: unit.color, fontSize: 22 }}>{sec.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 8 }}>
                  <Text style={s.secName}>{sec.name}</Text>
                  {sec.hasVideo && (
                    <View style={s.badge}>
                      <Text style={s.badgeTxt}>📹 فيديو</Text>
                    </View>
                  )}
                </View>
                <Text style={s.secDesc}>{sec.desc}</Text>
              </View>
              <Text style={[s.arrow, { color: unit.color }]}>←</Text>
            </TouchableOpacity>
            {i < SECTIONS.length - 1 && <View style={s.divider} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [unit, setUnit] = useState(null);
  if (screen === 'splash') return <SplashScreen onDone={() => setScreen('code')} />;
  if (screen === 'code')   return <CodeScreen onEnter={() => setScreen('home')} />;
  if (screen === 'home')   return <HomeScreen onSelect={u => { setUnit(u); setScreen('unit'); }} />;
  if (screen === 'unit')   return <UnitScreen unit={unit} onBack={() => setScreen('home')} />;
}

const s = StyleSheet.create({
  splash:      { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  logoBox:     { width: 110, height: 110, borderRadius: 30, backgroundColor: '#0a0a0a', borderWidth: 1.5, borderColor: '#00f5ff', alignItems: 'center', justifyContent: 'center', marginBottom: 28, shadowColor: '#00f5ff', shadowOpacity: 0.9, shadowRadius: 24, elevation: 12 },
  atomIcon:    { fontSize: 54 },
  splashTitle: { color: 'rgba(255,255,255,0.7)', fontSize: 16, textAlign: 'center', marginBottom: 6 },
  splashSub:   { color: '#fff', fontSize: 36, fontWeight: '900', textAlign: 'center' },
  codeScreen:  { flex: 1, backgroundColor: '#050505', alignItems: 'center', justifyContent: 'center', padding: 30 },
  codeIconBox: { width: 78, height: 78, borderRadius: 22, backgroundColor: 'rgba(191,0,255,0.1)', borderWidth: 1, borderColor: 'rgba(191,0,255,0.4)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  codeTitle:   { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 6 },
  codeSub:     { color: '#555', fontSize: 13, marginBottom: 32 },
  codeInput:   { width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1.5, borderColor: 'rgba(191,0,255,0.5)', borderRadius: 14, color: '#fff', fontSize: 22, fontWeight: '700', padding: 16, letterSpacing: 6, marginBottom: 14 },
  enterWrap:   { width: '100%', borderRadius: 14, overflow: 'hidden' },
  enterBtn:    { padding: 18, alignItems: 'center' },
  enterTxt:    { color: '#000', fontSize: 17, fontWeight: '800' },
  home:        { flex: 1, backgroundColor: '#050505' },
  homeHeader:  { padding: 20, paddingTop: 54, marginBottom: 8 },
  greeting:    { color: '#555', fontSize: 13, marginBottom: 4 },
  homeTitle:   { fontSize: 26, fontWeight: '900', color: '#00f5ff', marginBottom: 4 },
  homeSub:     { color: '#444', fontSize: 13 },
  grid:        { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
  card:        { width: (width - 44) / 2, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 20, borderWidth: 1, padding: 18, alignItems: 'center' },
  cardIcon:    { width: 54, height: 54, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  cardNum:     { fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  cardName:    { color: 'rgba(255,255,255,0.75)', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  unitScreen:  { flex: 1, backgroundColor: '#050505' },
  unitHeader:  { padding: 20, paddingTop: 54 },
  backBtn:     { alignSelf: 'flex-start', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, marginBottom: 20 },
  backTxt:     { fontSize: 14, fontWeight: '700' },
  unitNumLabel:{ fontSize: 11, fontWeight: '700', letterSpacing: 3, marginBottom: 6, opacity: 0.8 },
  unitTitle:   { color: '#fff', fontSize: 24, fontWeight: '900' },
  sections:    { padding: 20, gap: 10 },
  secCard:     { backgroundColor: 'rgba(255,255,255,0.025)', borderRadius: 18, borderWidth: 1, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 },
  secIcon:     { width: 54, height: 54, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  secName:     { color: '#fff', fontSize: 16, fontWeight: '700' },
  secDesc:     { color: '#555', fontSize: 12 },
  arrow:       { fontSize: 16, opacity: 0.7 },
  badge:       { backgroundColor: 'rgba(0,245,255,0.1)', borderWidth: 1, borderColor: 'rgba(0,245,255,0.3)', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  badgeTxt:    { color: '#00f5ff', fontSize: 9, fontWeight: '700' },
  divider:     { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 4 },
});
