"use client"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Copy, RotateCw } from "lucide-react"

export default function home() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)

  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz"
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (useNumbers) charset += "0123456789"
    if (useSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
  }

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Gerador De Senha</h1>
          <p className="mt-2 text-gray-600">Utilize o nosso gerador online para criar uma senha forte e segura.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="relative">
            <input
              type="text"
              readOnly
              value={password}
              className="w-full p-3 pr-24 text-lg border rounded-lg bg-gray-50"
              placeholder="Sua senha aparecerá aqui"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button onClick={copyToClipboard} className="p-2 text-gray-500 hover:text-gray-700" title="Copiar senha">
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={generatePassword}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Gerar nova senha"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personalizar</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Tamanho:</span>
                    <span className="text-gray-500">{length}</span>
                  </div>
                  <Slider
                    value={[length]}
                    onValueChange={(value: number[]) => setLength(value[0])}
                    min={8}
                    max={32}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={useUppercase}
                      onCheckedChange={(checked: boolean) => setUseUppercase(checked)}
                    />
                    <label htmlFor="uppercase" className="text-gray-700">
                      Maiúsculas
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={useNumbers}
                      onCheckedChange={(checked: boolean) => setUseNumbers(checked)}
                    />
                    <label htmlFor="numbers" className="text-gray-700">
                      Números
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={useSymbols}
                      onCheckedChange={(checked: boolean) => setUseSymbols(checked)}
                    />
                    <label htmlFor="symbols" className="text-gray-700">
                      Símbolos
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={copyToClipboard} className="flex-1 bg-purple-500 hover:bg-purple-600">
                Copiar Senha
              </Button>
              <Button onClick={generatePassword} className="flex-1 bg-purple-500 hover:bg-purple-600">
                Gerar Senha
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}