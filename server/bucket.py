from secrets import BUCKET_NAME
import boto3

s3 = boto3.resource('s3')
bucket = s3.Bucket(BUCKET_NAME)
