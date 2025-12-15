import testCasePostRequestPayload from '../request-objects/test-cases/POST_test_case.json'
import { faker } from '@faker-js/faker';

export function getNewRandomTestCase() {
    const testCasePostRequest = structuredClone(testCasePostRequestPayload)
    testCasePostRequest.title = faker.lorem.sentence(5)
    testCasePostRequest.comment = faker.lorem.sentence(6)
    testCasePostRequest.steps.pop();
    testCasePostRequest.steps.push({ description: faker.lorem.sentence(7), expected: faker.lorem.sentence(7) })
    return testCasePostRequest

}