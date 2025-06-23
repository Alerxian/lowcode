import { useMemo } from 'react'

import { DividerBlockProtocol } from '@/protocols/block'

export interface DividerBlockProps {
  data?: DividerBlockProtocol
}

export function DividerBlock(props: DividerBlockProps) {
  const { data } = props

  const styles = useMemo<React.CSSProperties>(() => {
    if (!data?.props) {
      return {}
    }
    const { size } = data.props

    return {
      width: (size?.width ?? 0) + (size?.widthUnit ?? 'px'),
      height: (size?.height ?? 0) + (size?.heightUnit ?? 'px'),
    }
  }, [data?.props])

  return <div className="w-full h-full bg-zinc-200" style={styles}></div>
}
