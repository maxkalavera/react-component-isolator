import React from "react"

import { ROOT_ELEMENT_ID } from "src/utils/constants"
import {fireEvent, render, screen, waitFor, InspectReactIsolatorContext, testingInitialContextState, cleanup, act} from "src/utils/test-utils"
import BackgroundCanvas from "src/components/BackgroundCanvas"
import {ReactIsolatorContextProvider} from 'src/providers/ReactIsolatorContext'

import { ReactIsolatorContext } from "src/providers/ReactIsolatorContext.d"
import { ReactIsolatorActions } from "src/providers/ReactIsolatorContext.d"

describe('Background canvas', () => {
  const testContext:{
    dispatch?: React.Dispatch<ReactIsolatorActions>
    callback?: jest.MockedFunction<(...args: any[]) => any>
  } = Object.create({})
  beforeEach(() => {
    render(
      <ReactIsolatorContextProvider
        initialState={{
          ...testingInitialContextState,
          canvasSize: {width: 800, height: 600},
          isGridOn: false,
          isSizeFramesOn: false,
          isFrameRulersOn: false
        }}
      >
        <div id={ROOT_ELEMENT_ID}></div>
        <BackgroundCanvas />
        <InspectReactIsolatorContext 
          callback={(context: ReactIsolatorContext) => {
            testContext.callback && testContext.callback(context)
            testContext.dispatch = context.dispatch
          }}
        />
      </ReactIsolatorContextProvider>
    )
  })

  afterEach(() => {
    cleanup()
  })

  test('should draw grid in background when grid is on', async () => {
    const canvas: HTMLCanvasElement = await screen.findByTestId('background-grid-canvas')
    canvas.getContext = jest.fn((type) => null)
    testContext.callback = jest.fn((context) => context.isGridOn)
    act(() => {
      testContext.dispatch && testContext.dispatch({
        type: 'SET_IS_GRID_ON',
        payload: true
      })
    })
    await waitFor(() => expect(testContext.callback).toHaveLastReturnedWith(true))
    await waitFor(() => expect(canvas.getContext).toHaveBeenCalled())
  })

  test('should draw a size frames in background when size frames is on', async () => {
    const canvas: HTMLCanvasElement = await screen.findByTestId('background-size-frames-canvas')
    canvas.getContext = jest.fn((type) => null)
    testContext.callback = jest.fn((context) => context.isSizeFramesOn)
    act(() => {
      testContext.dispatch && testContext.dispatch({
        type: 'SET_IS_SIZE_FRAMES_ON',
        payload: true
      })
    })
    await waitFor(() => expect(testContext.callback).toHaveLastReturnedWith(true))
    await waitFor(() => expect(canvas.getContext).toHaveBeenCalled())
  })

  test('should draw a grid in the background when grid is on', async () => {
    const canvas: HTMLCanvasElement = await screen.findByTestId('background-frame-rulers-canvas')
    canvas.getContext = jest.fn((type) => null)
    testContext.callback = jest.fn((context) => context.isFrameRulersOn)
    act(() => {
      testContext.dispatch && testContext.dispatch({
        type: 'SET_IS_FRAME_RULERS_ON',
        payload: true
      })
    })
    await waitFor(() => expect(testContext.callback).toHaveLastReturnedWith(true))
    await waitFor(() => expect(canvas.getContext).toHaveBeenCalled())
  })
})
