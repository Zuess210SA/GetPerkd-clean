'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

type Redemption = {
  id: string
  date: string
  method: string
  user_name: string
  user_email: string
  card_name: string
  reward_title: string
  business_name: string
  business_category: string
  campus: string
  merchant_id: string
  redeemed_by_staff: boolean
  staff_pin: string
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<Redemption[]>([])
  const [loading, setLoading] = useState(true)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [campus, setCampus] = useState('')
  const [merchantId, setMerchantId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/analytics/export-redemption-csv', {
          params: {
            from,
            to,
            campus,
            merchant_id: merchantId
          }
        })
        const parsed = await parseCSV(res.data)
        setData(parsed)
      } catch (err) {
        console.error('Error loading analytics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [from, to, campus, merchantId])

  const parseCSV = async (csvText: string): Promise<Redemption[]> => {
    const lines = csvText.split('\n')
    const headers = lines[0].split(',')
    return lines.slice(1).filter(Boolean).map(line => {
      const values = line.split(',')
      const entry: any = {}
      headers.forEach((header, index) => {
        entry[header.trim()] = values[index]?.trim()
      })
      return entry
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Redemption Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input className="border p-2 rounded" type="date" value={from} onChange={e => setFrom(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={to} onChange={e => setTo(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Campus" value={campus} onChange={e => setCampus(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Merchant ID" value={merchantId} onChange={e => setMerchantId(e.target.value)} />
      </div>

      <a
        href={`/api/analytics/export-redemption-csv?from=${from}&to=${to}&campus=${campus}&merchant_id=${merchantId}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        target="_blank"
      >
        Download CSV
      </a>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">User</th>
                <th className="p-2">Card</th>
                <th className="p-2">Reward</th>
                <th className="p-2">Business</th>
                <th className="p-2">Campus</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{row.user_name}</td>
                  <td className="p-2">{row.card_name}</td>
                  <td className="p-2">{row.reward_title}</td>
                  <td className="p-2">{row.business_name}</td>
                  <td className="p-2">{row.campus}</td>
                  <td className="p-2">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
