import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@/components/ui/Button';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@theme';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const LoginScreen = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      await login(phone, otp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <View style={styles.content}>
          {/* Logo & Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={[colors.gold, colors.goldDark]}
              style={styles.logoGradient}>
              <Text style={styles.logoText}>GJ</Text>
            </LinearGradient>
            <Text style={[styles.title, { color: themeColors.text }]}>
              Welcome to <Text style={{ color: colors.gold }}>GoldJar</Text>
            </Text>
            <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              Premium Gold & Silver Trading
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            {step === 'phone' ? (
              <>
                <Text style={[styles.label, { color: themeColors.text }]}>
                  Phone Number
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      backgroundColor: themeColors.glass,
                      borderColor: themeColors.border,
                    },
                  ]}>
                  <Text style={[styles.prefix, { color: themeColors.textSecondary }]}>
                    +91
                  </Text>
                  <TextInput
                    style={[styles.input, { color: themeColors.text }]}
                    placeholder="Enter 10-digit mobile number"
                    placeholderTextColor={themeColors.textTertiary}
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
                <Button
                  title="Send OTP"
                  onPress={handleSendOTP}
                  variant="primary"
                  style={styles.button}
                  disabled={phone.length !== 10}
                />
              </>
            ) : (
              <>
                <Text style={[styles.label, { color: themeColors.text }]}>
                  Enter OTP
                </Text>
                <Text style={[styles.otpSent, { color: themeColors.textSecondary }]}>
                  OTP sent to +91 {phone}
                </Text>
                <TextInput
                  style={[
                    styles.otpInput,
                    {
                      backgroundColor: themeColors.glass,
                      borderColor: themeColors.border,
                      color: themeColors.text,
                    },
                  ]}
                  placeholder="Enter 6-digit OTP"
                  placeholderTextColor={themeColors.textTertiary}
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                />
                <Button
                  title="Verify & Login"
                  onPress={handleVerifyOTP}
                  variant="primary"
                  style={styles.button}
                  loading={loading}
                  disabled={otp.length !== 6}
                />
                <TouchableOpacity onPress={() => setStep('phone')}>
                  <Text style={[styles.changeNumber, { color: colors.gold }]}>
                    Change Number
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: themeColors.textTertiary }]}>
              By continuing, you agree to our{' '}
              <Text style={{ color: colors.gold }}>Terms & Conditions</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.huge,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  logoText: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: '#000',
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.base,
    textAlign: 'center',
  },
  form: {
    gap: spacing.lg,
  },
  label: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
  },
  prefix: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: fontSize.md,
    paddingVertical: spacing.md,
  },
  otpSent: {
    fontSize: fontSize.sm,
    marginTop: -spacing.sm,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    letterSpacing: 8,
  },
  button: {
    marginTop: spacing.md,
  },
  changeNumber: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  footer: {
    marginTop: spacing.huge,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.xs,
    textAlign: 'center',
  },
});

export default LoginScreen;
