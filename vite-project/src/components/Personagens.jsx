import { useState } from 'react'
import { supabase } from '../supabase'
import { db } from '../firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

export default function Personagens() {
  const [imagem1, setImagem1] = useState(null)
  const [imagem2, setImagem2] = useState(null)
  const [nome1, setNome1] = useState('')
  const [nome2, setNome2] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  // Faz upload de uma imagem no Supabase Storage e retorna a URL pública
  async function uploadImagem(file, nomePersonagem) {
    const ext = file.name.split('.').pop()
    const path = `personagens/${nomePersonagem.toLowerCase().replace(/\s/g, '_')}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('Marvel') // nome do bucket
      .upload(path, file, { upsert: true })

    if (uploadError) throw new Error(`Erro no upload: ${uploadError.message}`)

    const { data } = supabase.storage
      .from('Marvel')
      .getPublicUrl(path)

    return data.publicUrl
  }

  // Salva o personagem no Firestore
  async function salvarNoFirestore(nome, urlImagem) {
    await addDoc(collection(db, 'personagens'), {
      nome,
      urlImagem,
      dataCadastro: Timestamp.now(),
    })
  }

  async function handleEnviar() {
    if (!nome1 || !nome2 || !imagem1 || !imagem2) {
      setStatus('⚠️ Preencha os dois nomes e selecione as duas imagens.')
      return
    }

    setLoading(true)
    setStatus('Enviando...')

    try {
      // Upload das imagens para o Supabase
      const url1 = await uploadImagem(imagem1, nome1)
      const url2 = await uploadImagem(imagem2, nome2)

      // Salva no Firestore com nome + URL pública + data
      await salvarNoFirestore(nome1, url1)
      await salvarNoFirestore(nome2, url2)

      setStatus(`✅ Sucesso! "${nome1}" e "${nome2}" cadastrados no Firestore.`)
    } catch (err) {
      setStatus(`❌ Erro: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>🦸 Cadastro de Personagens Marvel</h2>
      <p style={styles.sub}>Upload no Supabase + registro no Firestore</p>

      {/* Personagem 1 */}
      <div style={styles.card}>
        <h3>Personagem 1</h3>
        <input
          style={styles.input}
          type="text"
          placeholder="Nome (ex: Homem de Ferro)"
          value={nome1}
          onChange={e => setNome1(e.target.value)}
        />
        <input
          style={styles.input}
          type="file"
          accept="image/*"
          onChange={e => setImagem1(e.target.files[0])}
        />
        {imagem1 && (
          <img
            src={URL.createObjectURL(imagem1)}
            alt="preview 1"
            style={styles.preview}
          />
        )}
      </div>

      {/* Personagem 2 */}
      <div style={styles.card}>
        <h3>Personagem 2</h3>
        <input
          style={styles.input}
          type="text"
          placeholder="Nome (ex: Capitão América)"
          value={nome2}
          onChange={e => setNome2(e.target.value)}
        />
        <input
          style={styles.input}
          type="file"
          accept="image/*"
          onChange={e => setImagem2(e.target.files[0])}
        />
        {imagem2 && (
          <img
            src={URL.createObjectURL(imagem2)}
            alt="preview 2"
            style={styles.preview}
          />
        )}
      </div>

      <button
        style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}
        onClick={handleEnviar}
        disabled={loading}
      >
        {loading ? 'Enviando...' : '🚀 Enviar para Supabase + Firestore'}
      </button>

      {status && <p style={styles.status}>{status}</p>}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: 24,
    background: '#1e1e2e',
    borderRadius: 12,
    fontFamily: 'sans-serif',
    color: '#fff',
  },
  titulo: { textAlign: 'center', marginBottom: 4 },
  sub: { textAlign: 'center', color: '#aaa', marginBottom: 24 },
  card: {
    background: '#2a2a3d',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: '8px 10px',
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 6,
    border: '1px solid #444',
    background: '#1e1e2e',
    color: '#fff',
    boxSizing: 'border-box',
  },
  preview: {
    width: '100%',
    maxHeight: 160,
    objectFit: 'cover',
    borderRadius: 6,
    marginTop: 8,
  },
  btn: {
    width: '100%',
    padding: '12px 0',
    background: '#6c63ff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    cursor: 'pointer',
    marginTop: 8,
  },
  status: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
    color: '#ccc',
  },
}