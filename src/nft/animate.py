import os

from moviepy.editor import AudioFileClip, ImageClip, TextClip, VideoFileClip
from moviepy.video.compositing.CompositeVideoClip import CompositeVideoClip
from moviepy.video.compositing.concatenate import concatenate_videoclips
from moviepy.video.fx.all import loop
from moviepy.video.fx.painting import painting


def add_drawing_animation(
    image: str,
    audio: str,
    output_file: str,
    output_fps: int = 60,
    max_length_in_seconds: int = 60
):
    """
    Given an image and an audio clip, this
    turns the image into a video and applies
    a painting transition effect. Finally,
    it sets the audio to play in the background
    of the video and saves the .mp4 file to
    `output_file`.

    Arguments:
        image (str): Filepath to the image.
        audio (str): Filepath to the audio.
        output_file (str): Filepath where you want to
                           store the resulting video.
        output_fps (int): The frames-per-second to render
                          the `output_file` with.
        max_length_in_seconds (int): The maximum length of
                                     the final video.

    Returns:
        str: Returns `output_file`.

    """

    if not os.path.isfile(image):
        return None

    if not os.path.isfile(audio):
        return None

    output_directory, output_filename = os.path.split(output_file)
    if not os.path.isdir(output_directory):
        os.makedirs(output_directory)

    audio_clip = AudioFileClip(audio)
    video = ImageClip(image)

    video.duration = audio_clip.duration
    video.fps = output_fps

    image_freeze_frame = video.to_ImageClip(0)

    # before_transition_clip = video.subclip(0, int(audio_clip.duration * 0.25))
    # after_transition_clip = video.subclip(
    #     int(audio_clip.duration * 0.75), int(audio_clip.duration)
    # )
    before_transition_clip = video.subclip(0, 1)
    after_transition_clip = video.subclip(2, 3)

    paint_effect_image = video.fx(painting, saturation=1.6, black=0.006).to_ImageClip(0)

    paint_effect_video = (
        CompositeVideoClip([paint_effect_image])
        .set_duration(1)
        .add_mask()
        .crossfadein(0.5)
        .crossfadeout(0.5)
    )

    paint_with_fading_effect = CompositeVideoClip(
        [image_freeze_frame, paint_effect_video]
    )

    joined_video_clips = concatenate_videoclips(
        [
            before_transition_clip,
            paint_with_fading_effect.set_duration(paint_effect_video.duration),
            after_transition_clip,
        ]
    )

    looped_video = loop(joined_video_clips, duration=audio_clip.duration)
    looped_video = looped_video.set_audio(audio_clip)

    if looped_video.duration > max_length_in_seconds:
        looped_video = looped_video.subclip(0, max_length_in_seconds)

    looped_video.write_videofile(output_file)

    return output_file
