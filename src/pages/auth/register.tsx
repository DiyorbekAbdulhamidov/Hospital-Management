import React, { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useDisclosure } from '@mantine/hooks'
import { Group, LoadingOverlay, PasswordInput, TextInput, Title } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { notifications } from '@mantine/notifications'
import { Box, Button, Flex, Paper, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

interface RegisterProps {}

const Register: React.FunctionComponent<RegisterProps> = () => {
  const [visible, { toggle }] = useDisclosure(false)
  const [gender, setGender] = useState<string | null>(null)

  const form = useForm({
    initialValues: {
      fullName: '',
      password: '',
      email: '',
      dateOfBirth: '',
      phoneNumber: ''
    },
    validate: {
      fullName: value => (value.length < 2 ? 'Name must be at least 2 characters long and not blank' : null),
      password: value => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (!passwordRegex.test(value)) {
          return 'Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number'
        }
        return null
      },
      email: value => {
        return /^\S+@\S+$/.test(value) ? null : 'Invalid email'
      },
      dateOfBirth: value => {
        const parsedDate = new Date(value)
        if (isNaN(parsedDate.getTime())) {
          return 'Invalid date'
        }
        return null
      },
      phoneNumber: value => {
        const phoneRegex = /^[0-9]{13}$/
        if (!phoneRegex.test(value)) {
          return 'Invalid phone number'
        }
        return null
      }
    }
  })

  const handleError = (errors: typeof form.errors) => {
    if (errors.email) {
      notifications.show({
        message: 'Invalid email',
        color: 'red'
      })
    } else if (errors.password) {
      notifications.show({
        message: errors.password,
        color: 'red'
      })
    } else if (errors.fullName) {
      notifications.show({
        message: errors.fullName,
        color: 'red'
      })
    } else if (errors.dateOfBirth) {
      notifications.show({
        message: errors.dateOfBirth,
        color: 'red'
      })
    } else if (errors.phoneNumber) {
      notifications.show({
        message: errors.phoneNumber,
        color: 'red'
      })
    }
  }

  const handleSubmit = () => {
    if (form.isValid() && gender) {
      toggle()
      const userData = {
        email: form.values.email,
        password: form.values.password,
        fullName: form.values.fullName,
        dateOfBirth: form.values.dateOfBirth,
        phoneNumber: form.values.phoneNumber,
        gender: gender
      }

      axios
        .post('http://134.209.20.129:8082/user/auth/sign-up', userData)
        .then(response => {
          console.log('User signed up successfully:', response.data)
          toggle()
        })
        .catch(error => {
          if (error.response) {
            console.error('Error signing up:', error.response.data)
          } else if (error.request) {
            console.error('No response received:', error.request)
          } else {
            console.error('Error setting up the request:', error.message)
          }
          toggle()
        })
    }
  }
  return (
    <>
      <Box>
        <Flex mt={10} justify="center" align="center">
          <Paper className="formBox" shadow="xl" pos="relative">
            <Box mt={10}>
              <LoadingOverlay visible={visible} overlayBlur={2} />

              <Text ta="center" c="#2972FE" fw={600} fz={40}>
                Doctor Q
              </Text>
              <Text mt={20} fw={600} fz={20} ta="center">
                Sign up for free!
              </Text>
            </Box>
            <Box maw={320} mx="auto">
              <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
                <TextInput radius={70} mt="sm" size="xs" label="fullName" placeholder="fullName" {...form.getInputProps('fullName')} />
                <TextInput radius={70} mt="sm" size="xs" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                <PasswordInput mt={20} size="xs" radius={70} label="Password" placeholder="Password" {...form.getInputProps('password')} />
                <DateInput
                  mt="sm"
                  radius={70}
                  size="xs"
                  label="Date Of Birth"
                  valueFormat="DD/MM/YYYY "
                  placeholder="Date Of Your Birth (dd.mm.yyyy)"
                  maw={400}
                  mx="auto"
                  {...form.getInputProps('dateOfBirth')}
                />

                <TextInput radius={70} mt="sm" size="xs" label="Phone Number" placeholder="Phone Number" {...form.getInputProps('phoneNumber')} />

                <div className="gender">
                  <span>Gender:</span>
                  <label>
                    <small>Male</small>
                    <input type="radio" required name="gender" value="male" onChange={() => setGender('male')} />
                  </label>
                  <label>
                    <small>Female</small>
                    <input type="radio" required name="gender" value="female" onChange={() => setGender('female')} />
                  </label>
                </div>
                <Button fz={25} size="md" w="100%" radius={70} type="submit" mt="sm">
                  Sign Up
                </Button>
              </form>
            </Box>
            <Text ta="center" pt={20}>
              or continue with
            </Text>

            <Flex mt={20} justify="space-around">
              <Button className="socialLink" bg="white" c="black" fz={20} w={150}>
                Facebook
              </Button>
              <Group position="center">
                <Button className="socialLink" bg="white" c="black" fz={20} w={150} onClick={toggle}>
                  Google
                </Button>
              </Group>
            </Flex>
            <Title fw={400} ta="center" mt={20} fz={20}>
              Already have an account?{' '}
              <Text span c="blue" inherit>
                {' '}
                <Link to="/signIn">Sign In</Link>
              </Text>
            </Title>
          </Paper>
        </Flex>
      </Box>
    </>
  )
}

export default Register