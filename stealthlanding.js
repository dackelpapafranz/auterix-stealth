{\rtf1\ansi\ansicpg1252\cocoartf2708
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ useState \} from "react";\
import \{ Card, CardContent \} from "@/components/ui/card";\
import \{ Button \} from "@/components/ui/button";\
import \{ Input \} from "@/components/ui/input";\
import \{ motion \} from "framer-motion";\
\
export default function StealthLanding() \{\
  const [email, setEmail] = useState("");\
  const [submitted, setSubmitted] = useState(false);\
\
  const handleSubmit = (e) => \{\
    e.preventDefault();\
    if (email) \{\
      setSubmitted(true);\
      // Here you can integrate with an email collection service\
      fetch("https://api.yourservice.com/subscribe", \{\
        method: "POST",\
        headers: \{ "Content-Type": "application/json" \},\
        body: JSON.stringify(\{ email, to: "mail@franzdoerr.com" \})\
      \});\
    \}\
  \};\
\
  return (\
    <div className="flex items-center justify-center h-screen bg-black text-white">\
      <Card className="bg-gray-900 p-6 rounded-2xl shadow-xl w-96 text-center">\
        <CardContent>\
          <motion.h1\
            className="text-2xl font-bold"\
            initial=\{\{ opacity: 0, y: -10 \}\}\
            animate=\{\{ opacity: 1, y: 0 \}\}\
            transition=\{\{ duration: 0.5 \}\}\
          >\
            Something Big is Coming\
          </motion.h1>\
          <p className="mt-2 text-gray-400">Be the first to know.</p>\
          \{!submitted ? (\
            <form onSubmit=\{handleSubmit\} className="mt-4">\
              <Input\
                type="email"\
                placeholder="Enter your email"\
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"\
                value=\{email\}\
                onChange=\{(e) => setEmail(e.target.value)\}\
                required\
              />\
              <Button type="submit" className="mt-3 w-full bg-blue-600 hover:bg-blue-700">\
                Notify Me\
              </Button>\
            </form>\
          ) : (\
            <p className="mt-4 text-green-500">Thank you! You'll be the first to know.</p>\
          )\}\
        </CardContent>\
      </Card>\
    </div>\
  );\
\}\
}