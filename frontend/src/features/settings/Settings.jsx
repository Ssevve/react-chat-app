import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'features/settings/settingsSlice';

const Wrapper = styled.div`
  height: calc(100% - 4rem);
  top: 4rem;
  row-gap: 2rem;
  padding: 0.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Section = styled.section`
  display: grid;
  margin-top: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
`;

const ThemeSettingsWrapper = styled.section`
  display: flex;
  gap: 2rem;
  margin-top: var(--padding);
`;

const Label = styled.label`
  display: flex;
  gap: var(--padding);
  cursor: pointer;
`;

function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme);

  const handleThemeChange = (e) => {
    console.log(e.target.value);
    dispatch(setTheme(e.target.value));
  };

  return (
    <Wrapper>
      <Title>Settings</Title>
      <Section>
        <SectionTitle>Theme</SectionTitle>
        <ThemeSettingsWrapper>
          <Label>
            Light
            <input
              type="radio"
              id="light"
              value="light"
              name="theme"
              checked={theme === 'light'}
              onChange={handleThemeChange}
            />
          </Label>

          <Label>
            Dark
            <input
              type="radio"
              id="dark"
              value="dark"
              name="theme"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
            />
          </Label>
        </ThemeSettingsWrapper>
      </Section>
    </Wrapper>
  );
}

export default Settings;
