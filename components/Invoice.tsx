import { FC } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

type Props = {
  data?: {
    clientName?: string
  }
}

export const Invoice: FC<Props> = ({ data }) => {
  console.log(data)
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{data?.clientName}</Text>
        </View>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})
