import type { DiagnosticData } from '@/context/DiagnosticContext';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


// Definimos los estilos (similar a CSS pero limitado)
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#111827', // Color primario oscuro
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280', // Muted foreground
    marginTop: 4,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#374151',
    backgroundColor: '#F3F4F6',
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 10,
    color: '#111827',
  },
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  kpiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  kpiBox: {
    width: '30%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  kpiLabel: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 2,
  },
  textBlock: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
    color: '#374151',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    textAlign: 'center',
    color: '#9CA3AF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
});

interface PDFProps {
  data: DiagnosticData;
}

export const DiagnosticPDF = ({ data }: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>{data.companyName || "Empresa Sin Nombre"}</Text>
        <Text style={styles.subtitle}>Informe de Diagnóstico Sistémico - Generado por IA</Text>
      </View>

      {/* KPIs Principales */}
      <View style={styles.kpiContainer}>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiValue}>{data.entropyLevel.toFixed(0)}%</Text>
          <Text style={styles.kpiLabel}>Nivel de Entropía</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiValue}>{data.problemType.toUpperCase()}</Text>
          <Text style={styles.kpiLabel}>Tipología</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiValue}>
            {Object.values(data.subsystems).filter(v => v >= 4).length}
          </Text>
          <Text style={styles.kpiLabel}>Subsistemas Críticos</Text>
        </View>
      </View>

      {/* Descripción del Problema */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Descripción del Problema</Text>
        <Text style={styles.textBlock}>{data.problemDescription}</Text>
      </View>

      {/* Análisis de Subsistemas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Impacto en Subsistemas (1-5)</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Ventas:</Text>
          <Text style={styles.value}>{data.subsystems.ventas}/5</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Compras:</Text>
          <Text style={styles.value}>{data.subsystems.compras}/5</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Producción:</Text>
          <Text style={styles.value}>{data.subsystems.produccion}/5</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Recursos Humanos:</Text>
          <Text style={styles.value}>{data.subsystems.rrhh}/5</Text>
        </View>
      </View>

      {/* Metodología de Sistemas Blandos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Análisis Comparativo (MSB)</Text>
        {data.msbAnalysis.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={{...styles.label, color: '#EF4444', marginBottom: 2}}>REALIDAD ACTUAL:</Text>
            <Text style={{...styles.textBlock, marginBottom: 8}}>{item.current}</Text>
            
            <Text style={{...styles.label, color: '#10B981', marginBottom: 2}}>MODELO IDEAL:</Text>
            <Text style={styles.textBlock}>{item.ideal}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Este documento es un diagnóstico preliminar generado automáticamente por Pymes TGS.</Text>
        <Text>Fecha de generación: {new Date().toLocaleDateString()}</Text>
      </View>

    </Page>
  </Document>
);