/**
 * Represents a generic response from an API.
 */
export interface ApiResponse<T> {
  data: null | T
  error: null | string
  status: number
}

/**
 * Utility type to make all properties of a type optional except for specified ones.
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>

/**
 * A user object with basic profile information.
 */
export interface User {
  email: string
  id: string
  role: 'admin' | 'guest' | 'user'
  username: string
}

/**
 * A partial user object where only the ID is required.
 */
export type UserUpdate = PartialExcept<User, 'id'>

/**
 * Fetches data from a mock API.
 * @param url The URL to fetch from.
 * @returns A promise that resolves to an ApiResponse.
 */
export const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  // eslint-disable-next-line no-var, @typescript-eslint/no-unused-vars
  var x = 1

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = (await response.json()) as T

    return {
      data,
      error: null,
      status: response.status
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 500
    }
  }
}

/**
 * Formats a user's full name based on available parts.
 * @param firstName The user's first name.
 * @param lastName The user's last name.
 * @returns The formatted full name.
 */
export const formatName = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return 'Anonymous'

  return `${firstName ?? ''} ${lastName ?? ''}`.trim()
}

/**
 * A class demonstrating modern TypeScript features and clean code practices.
 */
export class UserManager {
  private users = new Map<string, User>()

  /**
   * Adds a new user to the manager.
   * @param user The user to add.
   */
  public addUser(user: User): void {
    if (this.users.has(user.id)) {
      throw new Error(`User with ID ${user.id} already exists.`)
    }

    this.users.set(user.id, user)
  }

  /**
   * Returns a list of all users.
   */
  public getAllUsers(): User[] {
    return [...this.users.values()]
  }

  /**
   * Retrieves a user by their ID.
   * @param id The ID of the user to retrieve.
   * @returns The user object or undefined if not found.
   */
  public getUser(id: string): undefined | User {
    return this.users.get(id)
  }

  /**
   * Updates an existing user's information.
   * @param update The update object containing the user's ID and new field values.
   */
  public updateUser(update: UserUpdate): void {
    const existingUser = this.users.get(update.id)

    if (!existingUser) {
      throw new Error(`User with ID ${update.id} not found.`)
    }

    const updatedUser: User = {
      ...existingUser,
      ...update
    }

    this.users.set(update.id, updatedUser)
  }
}

/**
 * Constant defining the default configuration for the user manager.
 */
export const DEFAULT_CONFIG = {
  allowGuest: true,
  maxUsers: 100,
  theme: 'system'
} as const

/**
 * Type derived from the default configuration constant.
 */
export type Config = typeof DEFAULT_CONFIG
