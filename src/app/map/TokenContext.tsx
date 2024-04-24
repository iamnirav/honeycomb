import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react'

interface TokenContextType {
  tokens: any
  setTokens: Dispatch<SetStateAction<any | null>>
}

export const TokenContext = createContext<TokenContextType>({
  tokens: {},
  setTokens: (prevState: SetStateAction<any | null>) => prevState,
})

export const TokenContextMockData = {
  '0,0':
    'https://ih1.redbubble.net/image.1998870214.8699/st,small,507x507-pad,600x600,f8f8f8.jpg',
  '5,2':
    'https://ih1.redbubble.net/image.3696224913.3159/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
  '3,6': 'https://pbs.twimg.com/media/FKHhSNqVIA8qpq5?format=jpg&name=large',
  '7,1':
    'https://64.media.tumblr.com/100c0423dd2858e45745ec2e951f3f97/b3cb6f27d46db4c6-11/s1280x1920/f9a75064b9fe4f4b3ec5334a11263a5376b5b4c7.png',
  '7,7': 'https://pbs.twimg.com/media/EfV-QZnX0AMePRQ.png',
  '0,7':
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/efb6a6d2-81dc-4dfc-8427-6c751938a6fc/dgl0kdr-9293ed08-2025-4f80-bfc0-6e1387bcc1c6.jpg/v1/fill/w_822,h_972,q_70,strp/adaine_abernant_by_valscar_arts_dgl0kdr-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUxMyIsInBhdGgiOiJcL2ZcL2VmYjZhNmQyLTgxZGMtNGRmYy04NDI3LTZjNzUxOTM4YTZmY1wvZGdsMGtkci05MjkzZWQwOC0yMDI1LTRmODAtYmZjMC02ZTEzODdiY2MxYzYuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pdje24xyebRuM8LVXBI6YCniC3YDQe07DgA-IcXTVLA',
}

export function TokenProvider({ children }: PropsWithChildren<{}>) {
  const [tokens, setTokens] = useState(TokenContextMockData)

  const memoized = useMemo(() => ({ tokens, setTokens }), [tokens, setTokens])

  return (
    <TokenContext.Provider value={memoized}>{children}</TokenContext.Provider>
  )
}
