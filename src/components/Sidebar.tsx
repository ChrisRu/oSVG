import React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { ISetting } from '../services/svgoSettings'
import { capitalize } from '../services/stringTransform'
import { Checkbox } from './Checkbox'

const SidebarWrapper = styled.div`
  background: #181818;
  color: #fff;
  max-width: 400px;
  padding: 1rem;
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;
`

const OptionGroup = styled.div`
  margin-bottom: 1rem;
`

const OptionTitle = styled.h2`
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
`

const Options = styled.div``

const Option = styled.label`
  display: block;
  padding: 0.4rem 0.5rem;
  display: flex;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  input {
    margin-right: 0.5rem;
  }
`

interface IProps {
  settings: ISetting[]
  onSettingsUpdate: (setting: ISetting) => void
}

export function Sidebar({ settings, onSettingsUpdate }: IProps) {
  const groupedSettings = settings.reduce<{ [key: string]: ISetting[] }>((total, setting) => {
    if (setting.category in total) {
      total[setting.category].push(setting)
    } else {
      total[setting.category] = [setting]
    }
    return total
  }, {})

  return (
    <SidebarWrapper>
      {Object.entries(groupedSettings).map(([header, settings]) => (
        <OptionGroup key={header}>
          <OptionTitle>
            {header
              .split(' ')
              .map(capitalize)
              .join(' ')}
          </OptionTitle>
          <Options>
            {settings.map(setting => (
              <Option key={setting.description}>
                <Checkbox
                  onChange={() =>
                    onSettingsUpdate(R.set(R.lensProp('value'), !setting.value, setting))
                  }
                  checked={setting.value}
                />
                <span>{setting.description}</span>
              </Option>
            ))}
          </Options>
        </OptionGroup>
      ))}
    </SidebarWrapper>
  )
}
